import {Component, Input, OnInit} from '@angular/core';
import {PostStore, UserStore} from "../post";
import {Observable, switchMap} from "rxjs";
import {CrudService} from "../services/crud/crud.service";
import {Collections} from "../services/crud/collections";
import firebase from "firebase/compat";
import {AuthService} from "../services/auth/auth.service";
import {take, tap} from "rxjs/operators";
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
          return this.crudService.handlePostsData<PostStore>(Collections.POSTS, this.id)
        })
      ))
    )
  }

  public trackByID(index: number, post: PostStore) {
    return post.sortID;
  }

}


