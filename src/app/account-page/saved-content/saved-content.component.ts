import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {map, switchMap, take, tap} from "rxjs/operators";
import {PostStore, UserStore} from "../../post";
import {Collections} from "../../services/crud/collections";
import {filter, Observable} from "rxjs";
import firebase from "firebase/compat";
import {CrudService} from "../../services/crud/crud.service";
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../../services/auth/auth.service";

@Component({
  selector: 'app-saved-content',
  templateUrl: './saved-content.component.html',
  styleUrls: ['./saved-content.component.css'],
})
export class SavedContentComponent implements OnInit {

  public routedID: null;

  public firePosts: Observable<PostStore[]>;

  constructor(private crudService: CrudService,
              private activatedRoute: ActivatedRoute,
              private authService: AuthService,
              public changeDetector: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.firePosts = this.authService.user$.pipe(
      filter((value: firebase.User | null) => !!value),
      switchMap((value: firebase.User | null) => this.crudService.handleMailData<UserStore>(Collections.USERS, '==', value?.email!)),
      switchMap((user: UserStore[]) => {
        return this.crudService.handleData<PostStore>(Collections.POSTS).pipe(
          map((posts: PostStore[]) => {
            return posts.filter((i: PostStore) => {
              return i.bookmarks.includes(user[0].userID)
            })
          }),
          tap((posts: PostStore[]) => {
            return posts.sort((a: PostStore, b: PostStore) => {
              return b.bookmarkDate - a.bookmarkDate
            })
          }),
        )
      }),
    )
  }

}
