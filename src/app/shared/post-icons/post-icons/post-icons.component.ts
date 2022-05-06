import {Component, Input, OnInit} from '@angular/core';
import {iconsSrc} from "../../../icons-path";
import {filter} from "rxjs";
import firebase from "firebase/compat";
import {map, switchMap, tap} from "rxjs/operators";
import {PostStore} from "../../../post";
import {Collections} from "../../../services/crud/collections";
import {AuthService} from "../../../services/auth/auth.service";
import {CrudService} from "../../../services/crud/crud.service";

@Component({
  selector: 'app-post-icons',
  templateUrl: './post-icons.component.html',
  styleUrls: ['./post-icons.component.css']
})
export class PostIconsComponent implements OnInit {

  @Input()
  public postLikes: string[];
  @Input()
  public postComments: [];
  @Input()
  public postID: string;

  public addColor: boolean;

  public icons = iconsSrc;

  constructor(private authService: AuthService,
              private crudService: CrudService) {
  }

  ngOnInit(): void {
    this.authService.user$.pipe(
      filter((value: firebase.User | null) => !!value),
      switchMap((value: firebase.User | null) => {
        return this.crudService.getUserDoc<PostStore>(Collections.POSTS, this.postID).pipe(
          tap((modifiedPost: PostStore | undefined) => {
            this.addColor = !!(modifiedPost?.likes.includes(value?.uid!));
          }))
      })
    ).subscribe();
  }

  public updateLikes(id: string) {
    this.authService.user$.pipe(
      filter((value: firebase.User | null) => !!value),
      switchMap((value: firebase.User | null) => {
        return this.crudService.getUserDoc<PostStore>(Collections.POSTS, id).pipe(
          map((postFromStore: PostStore | undefined) => {
            const userIndex = postFromStore?.likes.indexOf(value?.uid!);
            if (userIndex === -1) {
              this.addColor = true;
              return {
                likes: postFromStore?.likes.concat(value?.uid!),
              }
            } else {
              const newArr: string[] | undefined = postFromStore?.likes.splice(userIndex!, 1);
              this.addColor = false;
              return {
                likes: postFromStore?.likes,
              };
            }
          }),
          switchMap(newPost => this.crudService.updateObject(Collections.POSTS, id, {...newPost})))
      })
    ).subscribe();
  }

}
