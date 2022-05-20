import {Component, Input, OnInit} from '@angular/core';
import {PostStore, UserStore} from "../post";
import {Observable, switchMap} from "rxjs";
import {CrudService} from "../services/crud/crud.service";
import {Collections} from "../services/crud/collections";
import firebase from "firebase/compat";
import {AuthService} from "../services/auth/auth.service";
import {map, take, tap} from "rxjs/operators";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  @Input()
  public userID: string;
  public id: string;
  public user: firebase.User | null = null;

  public firePosts: Observable<PostStore[]>;

  public sort: string = 'likes';

  constructor(private crudService: CrudService,
              private authService: AuthService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.authService.user$.subscribe((value: firebase.User | null) => this.user = value);
    // this.firePosts = this.crudService.handlePostsData<PostStore>(Collections.POSTS, this.userID);

    this.firePosts = this.activatedRoute.params.pipe(
      switchMap(params => this.crudService.handleIdData<UserStore>(Collections.USERS, '==', params['id']).pipe(
        take(1),
        tap((user: UserStore[]) => {
          this.id = user[0].userID
        }),
        switchMap(() => {
          return this.crudService.handlePostsData<PostStore>(Collections.POSTS, this.id).pipe(
            map((posts: PostStore[]) => {
              return this.sortBy(posts, this.sort)
              // return  posts.sort((a: PostStore, b: PostStore) => {
              //   return b.sortID - a.sortID
              // })
            })
          )
        })
      ))
    )
  }

  public sortBy(arr: PostStore[], sortValue: string) {
    return arr.sort((a: PostStore, b: PostStore) => {
      if (sortValue === 'sortID') {
        return b.sortID - a.sortID
      } else if (sortValue === 'likes') {
        return b.likes.length - a.likes.length
      } else if (sortValue === 'comments') {
        return b.comments.length - a.comments.length
      } else {
        return a.sortID - b.sortID
      }
    })
  }

  public trackByID(index: number, post: PostStore) {
    return post.sortID;
  }

}


