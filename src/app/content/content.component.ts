import {
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {PostStore, UserStore} from "../post";
import {Observable, of, Subscription, switchMap} from "rxjs";
import {CrudService} from "../services/crud/crud.service";
import {Collections} from "../services/crud/collections";
import firebase from "firebase/compat";
import {AuthService} from "../services/auth/auth.service";
import {map, take, tap} from "rxjs/operators";
import {ActivatedRoute} from "@angular/router";
import {iconsSrc} from "../icons-path";
import {ShareService} from "../services/share.service";

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']

})
export class ContentComponent implements OnInit, OnDestroy {

  @Input()
  public userID: string;

  public icons = iconsSrc;

  public id: string;
  public user: firebase.User | null = null;
  public firePosts: Observable<PostStore[]>;
  public sort: string;

  private subscriptions: Subscription[] = [];

  constructor(private crudService: CrudService,
              private authService: AuthService,
              private activatedRoute: ActivatedRoute,
              private share: ShareService) {
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.authService.user$.subscribe((value: firebase.User | null) => this.user = value)
    );

    this.firePosts = this.activatedRoute.params.pipe(
      switchMap(params => this.crudService.handleIdData<UserStore>(Collections.USERS, '==', params['id']).pipe(
        take(1),
        tap((user: UserStore[]) => {
          this.id = user[0].userID
        }),
        switchMap(() => this.share.filterString.pipe(
            switchMap((value: string) => {
              return this.crudService.handlePostsData<PostStore>(Collections.POSTS, this.id).pipe(
                map((posts: PostStore[]) => {
                  return this.sortBy(posts, value)
                })
              )
            })
          )
        ))
      ))
  }

  public sortBy(arr: PostStore[], sort: string) {
    return arr.sort((a: PostStore, b: PostStore) => {
      switch (sort) {
        case 'All photos':
          return b.sortID - a.sortID;
        case 'Most liked':
          return b.likes.length - a.likes.length;
        case 'Most commented':
          return b.comments.length - a.comments.length;
        default:
          return b.sortID - a.sortID;
      }
    })
  }

  public trackByID(index: number, post: PostStore) {
    return post.sortID;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}


