import {Component, Input, OnInit} from '@angular/core';
import {iconsSrc} from "../../../icons-path";
import {filter, Observable} from "rxjs";
import firebase from "firebase/compat";
import {map, switchMap, take, tap} from "rxjs/operators";
import {PostStore, UserStore} from "../../../post";
import {Collections} from "../../../services/crud/collections";
import {AuthService} from "../../../services/auth/auth.service";
import {CrudService} from "../../../services/crud/crud.service";
import {Clipboard} from "@angular/cdk/clipboard";
import {NotifierService} from "angular-notifier";

@Component({
  selector: 'app-post-icons',
  templateUrl: './post-icons.component.html',
  styleUrls: ['./post-icons.component.css']
})
export class PostIconsComponent implements OnInit {

  @Input()
  public size: string;
  @Input()
  public postID: string;
  @Input()
  public creator: string;
  @Input()
  public isShare: boolean;
  @Input()
  public sharePostId: string;



  public changeLike: boolean;

  public changeBookmark: boolean;

  public likes: number | undefined;

  public comments: number | undefined;

  public icons = iconsSrc;

  public firePosts: Observable<PostStore[]>;

  constructor(private authService: AuthService,
              private crudService: CrudService,
              private clipboard: Clipboard,
              private notifier: NotifierService) {
    this.notifier = notifier
  }

  public showNotification( type: string, message: string ): void {
    this.notifier.notify( type, message );
  }

  ngOnInit(): void {
    this.authService.user$.pipe(
      filter((value: firebase.User | null) => !!value),
      switchMap((value: firebase.User | null) => {
        return this.crudService.handleData<PostStore>(Collections.POSTS).pipe(
          map((chosenPost: PostStore[]) => {
            chosenPost.forEach((currentPost: PostStore) => {
              if (currentPost.id === this.postID) {
                this.changeLike = !!(currentPost?.likes.includes(value?.uid!));
                this.changeBookmark = !!(currentPost?.bookmarks.includes(value?.uid!));
                this.likes = currentPost.likes.length;
                this.comments = currentPost.comments.length;
              }
            })
          })
        )
      })
    ).subscribe();
  }

  public copyShareLink() {
    this.clipboard.copy(this.sharePostId);
    this.showNotification('success', 'Link copied!')
  }

  public updateLikes(id: string) {
    this.authService.user$.pipe(
      filter((value: firebase.User | null) => !!value),
      switchMap((value: firebase.User | null) => {
        return this.crudService.getUserDoc<PostStore>(Collections.POSTS, id).pipe(
          map((postFromStore: PostStore | undefined) => {
            const userIndex = postFromStore?.likes.indexOf(value?.uid!);
            if (userIndex === -1) {
              this.changeLike = true;
              return {
                likes: postFromStore?.likes.concat(value?.uid!),
              }
            } else {
              const newArr: string[] | undefined = postFromStore?.likes.splice(userIndex!, 1);
              this.changeLike = false;
              return {
                likes: postFromStore?.likes,
              };
            }
          }),
          switchMap(newPost => this.crudService.updateObject(Collections.POSTS, id, {...newPost})))
      })
    ).subscribe();
  }

  public addBookmark(id: string) {
    this.authService.user$.pipe(
      filter((value: firebase.User | null) => !!value),
      switchMap((value: firebase.User | null) => {
        return this.crudService.getUserDoc<PostStore>(Collections.POSTS, id).pipe(
          map((postFromStore: PostStore | undefined) => {
            const userIndex = postFromStore?.bookmarks.indexOf(value?.uid!);
            if (userIndex === -1) {
              this.changeBookmark = true;
              return {
                bookmarkDate: new Date().getTime(),
                bookmarks: postFromStore?.bookmarks.concat(value?.uid!),
              }
            } else {
              const newArr: string[] | undefined = postFromStore?.bookmarks.splice(userIndex!, 1);
              this.changeBookmark = false;
              return {
                bookmarkDate: 0,
                bookmarks: postFromStore?.bookmarks,
              };
            }
          }),
          switchMap(newPost => this.crudService.updateObject(Collections.POSTS, id, {...newPost})))
      })
    ).subscribe();
  }

}
