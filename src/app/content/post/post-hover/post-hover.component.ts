import {Component, Input, OnInit} from '@angular/core';
import {iconsSrc} from "../../../icons-path";
import firebase from "firebase/compat";
import {AuthService} from "../../../services/auth/auth.service";
import {PostStore} from "../../../post";
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

  public addColor: boolean = false;

  public icons = iconsSrc;

  constructor(private authService: AuthService,
              private crudService: CrudService) {
  }

  ngOnInit(): void {
    this.authService.user$.subscribe((value: firebase.User | null) => this.user = value);
  }

  public updateLikes(id: string) {
    this.authService.user$.pipe(
      filter((value: firebase.User | null) => !!value),
      switchMap((value: firebase.User | null) => {
        return this.crudService.getUserDoc<PostStore>(Collections.POSTS, id).pipe(
          map((post) => {
            const userIndex = post?.likes.indexOf(value?.uid!);
            if (userIndex === -1) {
              return post?.likes.concat(value?.uid!)
            } else {
              const newArr: string[] | undefined = post?.likes.splice(userIndex!, 1);
              return post?.likes;
            }
          }),
          switchMap(likes => this.crudService.updateObject(Collections.POSTS, id, {likes})))
      })
    ).subscribe();
  }

}
