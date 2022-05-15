import {Component, HostBinding, OnInit, ViewEncapsulation} from '@angular/core';
import firebase from "firebase/compat";
import {combineLatestWith, filter, Observable} from "rxjs";
import {PostStore, UserStore} from "../post";
import {Collections} from "../services/crud/collections";
import {AuthService} from "../services/auth/auth.service";
import {CrudService} from "../services/crud/crud.service";
import {combineLatest, map, switchMap, take, tap} from "rxjs/operators";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-feed-page',
  templateUrl: './feed-page.component.html',
  styleUrls: ['./feed-page.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class FeedPageComponent implements OnInit {

  public user: firebase.User | null = null;
  public fireUser: UserStore
  public userFollowing: string[]
  public firePosts: Observable<PostStore[]>;
  public fireUsers: Observable<UserStore[]>;
  public routedID: string
  public userID: string;

  constructor(private authService: AuthService,
              private crudService: CrudService,
              private activatedRoute: ActivatedRoute) {
  }

  @HostBinding('class.feed') someField: boolean = true;


  ngOnInit(): void {
    // this.firePosts = this.authService.user$.pipe(
    //   tap((value: firebase.User | null) => this.user = value),
    //   filter((value: firebase.User | null) => !!value),
    //   switchMap((value: firebase.User | null) => {
    //     return this.crudService.handleMailData<UserStore>(Collections.USERS, '==', value?.email!).pipe(
    //       // tap(value => console.log(value[0]))
    //       combineLatestWith(this.crudService.handleData<PostStore>(Collections.POSTS)),
    //       // tap(value => console.log(value)),
    //       map((combo) => {
    //         return combo[1].filter(i => {
    //          return  combo[0][0].following.includes(i.createdBy)
    //         })
    //       })
    //     )
    //   })
    // )

    this.activatedRoute.params.pipe(
      switchMap(params => this.crudService.handleIdData<UserStore>(Collections.USERS, '==', params['id']).pipe(
        take(1))),
        tap((user) => this.routedID = user[0].userID)
    ).subscribe()


    this.firePosts = this.authService.user$.pipe(
      // tap((value: firebase.User | null) => this.user = value),
      filter((value: firebase.User | null) => !!value),
      switchMap((value: firebase.User | null) => {
        return this.crudService.handleMailData<UserStore>(Collections.USERS, '==', value?.email!).pipe(
          tap(user => this.userID = user[0].userID)
        )
      }),
      switchMap((user: UserStore[]) => {
        return this.crudService.handleData<PostStore>(Collections.POSTS).pipe(
          map(posts => {
            return posts.filter(i => {
              return user[0].following.includes(i.createdBy)
            })
          }),
          take(1)
        )
      })
    )
  }

}
