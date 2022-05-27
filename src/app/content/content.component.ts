import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {PostStore, UserStore} from "../post";
import {Observable, of, switchMap} from "rxjs";
import {CrudService} from "../services/crud/crud.service";
import {Collections} from "../services/crud/collections";
import firebase from "firebase/compat";
import {AuthService} from "../services/auth/auth.service";
import {map, take, tap} from "rxjs/operators";
import {ActivatedRoute} from "@angular/router";
import {FilterService} from "../services/filter.service";

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
  public postsAmount: number;
  public sort: string;

  constructor(private crudService: CrudService,
              private authService: AuthService,
              private activatedRoute: ActivatedRoute,
              public filterService: FilterService) {
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
        switchMap(() => this.filterService.val$.pipe(
            switchMap((value: string) => {
              return this.crudService.handlePostsData<PostStore>(Collections.POSTS, this.id).pipe(
                map((posts: PostStore[]) => {
                  return this.sortBy(posts, value)
                  // return  posts.sort((a: PostStore, b: PostStore) => {
                  //   return b.sortID - a.sortID
                  // })
                })
              )
            })
          ),
        ))
      ))

  }

  public sortBy(arr: PostStore[], sort: string) {
    return arr.sort((a: PostStore, b: PostStore) => {
      if (sort === 'All photos') {
        return b.sortID - a.sortID
      } else if (sort === 'Most liked') {
        return b.likes.length - a.likes.length
      } else if (sort === 'Most commented') {
        return b.comments.length - a.comments.length
      } else {
        return b.sortID - a.sortID
      }
    })
  }

  public trackByID(index: number, post: PostStore) {
    return post.sortID;
  }

}


