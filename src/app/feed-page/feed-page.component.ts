import {Component, HostBinding, OnInit, ViewEncapsulation} from '@angular/core';
import firebase from "firebase/compat";
import {combineLatestWith, filter, Observable} from "rxjs";
import {PostStore, UserStore} from "../post";
import {Collections} from "../services/crud/collections";
import {AuthService} from "../services/auth/auth.service";
import {CrudService} from "../services/crud/crud.service";
import {combineLatest, map, switchMap, take, tap} from "rxjs/operators";
import {iconsSrc} from "../icons-path";

@Component({
  selector: 'app-feed-page',
  templateUrl: './feed-page.component.html',
  styleUrls: ['./feed-page.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class FeedPageComponent implements OnInit {

  public firePosts: Observable<PostStore[]>;
  public routedID: null;
  public icons = iconsSrc;

  constructor(private authService: AuthService,
              private crudService: CrudService) {
  }

  @HostBinding('class.feed') someField: boolean = true;

  ngOnInit(): void {
    this.firePosts = this.authService.user$.pipe(
      filter((value: firebase.User | null) => !!value),
      switchMap((value: firebase.User | null) => this.crudService.handleMailData<UserStore>(Collections.USERS, '==', value?.email!)),
      switchMap((user: UserStore[]) => {
        return this.crudService.handleData<PostStore>(Collections.POSTS).pipe(
          map((posts: PostStore[]) => {
            return posts.filter((i: PostStore) => {
              return user[0].following.includes(i.createdBy)
            })
          }),
          tap((posts: PostStore[]) => {
            return posts.sort((a: PostStore, b: PostStore) => {
              return b.sortID - a.sortID
            })
          }),
          take(1)
        )
      })
    )
  }

}
