import {Component, Input, OnInit} from '@angular/core';
import {iconsSrc} from "../../../icons-path";
import firebase from "firebase/compat";
import {AuthService} from "../../../services/auth/auth.service";
import {Post, PostStore} from "../../../post";
import {Collections} from "../../../services/crud/collections";
import {CrudService} from "../../../services/crud/crud.service";
import {map, switchMap, tap} from "rxjs/operators";
import {filter} from "rxjs";

@Component({
  selector: 'app-post-hover',
  templateUrl: './post-hover.component.html',
  styleUrls: ['./post-hover.component.css']
})
export class PostHoverComponent implements OnInit {

  @Input()
  public postTitle: string = '';
  @Input()
  public postLikes: string[];
  @Input()
  public postComments: [];
  @Input()
  public postID: string;

  public user: firebase.User | null = null;

  public addColor: boolean;

  public icons = iconsSrc;

  constructor(private authService: AuthService,
              private crudService: CrudService) {
  }

  ngOnInit(): void {
    this.authService.user$.subscribe((value: firebase.User | null) => this.user = value);
    this.checkColor(this.postID);
  }

  public updateLikes(id: string) {
    this.authService.user$.pipe(
      filter((value: firebase.User | null) => !!value),
      switchMap((value: firebase.User | null) => {
        return this.crudService.getUserDoc<PostStore>(Collections.POSTS, id).pipe(
          map((postFromStore: PostStore | undefined) => {
            const userIndex = postFromStore?.likes.indexOf(value?.uid!);
            if (userIndex === -1) {
              return {
                likes: postFromStore?.likes.concat(value?.uid!),
              }
            } else {
              const newArr: string[] | undefined = postFromStore?.likes.splice(userIndex!, 1);
              return {
                likes: postFromStore?.likes,
              };
            }
          }),
          tap(modifiedPost => {
            this.addColor = !!(modifiedPost.likes?.includes(value?.uid!));
          }),
          switchMap(newPost => this.crudService.updateObject(Collections.POSTS, id, {...newPost})))
      })
    ).subscribe();
  }

  public checkColor(id: string) {
    this.authService.user$.pipe(
      filter((value: firebase.User | null) => !!value),
      switchMap((value: firebase.User | null) => {
        return this.crudService.getUserDoc<PostStore>(Collections.POSTS, id).pipe(
          tap((modifiedPost: PostStore | undefined) => {
            this.addColor = !!(modifiedPost?.likes.includes(value?.uid!));
          }))
      })
    ).subscribe();
  }

}
