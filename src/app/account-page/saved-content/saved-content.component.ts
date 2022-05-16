import { Component, OnInit } from '@angular/core';
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
  styleUrls: ['./saved-content.component.css']
})
export class SavedContentComponent implements OnInit {

  public routedID: string
  public firePosts: Observable<PostStore[]>;
  public userID: string;


  constructor(private crudService: CrudService,
              private activatedRoute: ActivatedRoute,
              private authService: AuthService) { }

  ngOnInit(): void {

    this.activatedRoute.params.pipe(
      switchMap(params => this.crudService.handleIdData<UserStore>(Collections.USERS, '==', params['id']).pipe(
        take(1)
      )),
      tap((user) => this.routedID = user[0].userID)
    ).subscribe()


    this.firePosts = this.authService.user$.pipe(
      filter((value: firebase.User | null) => !!value),
      switchMap((value: firebase.User | null) => {
        return this.crudService.handleMailData<UserStore>(Collections.USERS, '==', value?.email!).pipe(
          tap((user: UserStore[]) => this.userID = user[0].userID)
        )
      }),
      switchMap((user: UserStore[]) => {
        return this.crudService.handleData<PostStore>(Collections.POSTS).pipe(
          map((posts: PostStore[]) => {
            return posts.filter((i: PostStore) => {
              return i.bookmarks.includes(this.userID)
            })
          }),
          // take(1)
        )
      })
    )
  }

}
