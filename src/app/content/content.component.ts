import {Component, Input, OnInit} from '@angular/core';
import {PostStore} from "../post";
import {Observable} from "rxjs";
import {CrudService} from "../services/crud/crud.service";
import {Collections} from "../services/crud/collections";
import firebase from "firebase/compat";
import {AuthService} from "../services/auth/auth.service";

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  @Input()
  public userID: string;

  public user: firebase.User | null = null;

  public firePosts: Observable<PostStore[]>;

  constructor(private crudService: CrudService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.user$.subscribe((value: firebase.User | null) => this.user = value);
    this.firePosts = this.crudService.handlePostsData<PostStore>(Collections.POSTS, this.userID);
  }

  public trackByID(index: number, post: PostStore) {
    return post.sortID;
  }

}


