import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {iconsSrc} from "../../icons-path";
import {filter, Observable, Subscription} from "rxjs";
import firebase from "firebase/compat";
import {map, switchMap, take, tap} from "rxjs/operators";
import {PostStore, UserStore} from "../../post";
import {Collections} from "../../services/crud/collections";
import {AuthService} from "../../services/auth/auth.service";
import {CrudService} from "../../services/crud/crud.service";
import {Clipboard} from "@angular/cdk/clipboard";
import {NotifierService} from "angular-notifier";
import {EditUserComponent} from "../../account/account-info/edit-user/edit-user.component";
import {MatDialog} from "@angular/material/dialog";
import {LikesPopupComponent} from "./likes-popup/likes-popup.component";
import {ShareService} from "../../services/share.service";

@Component({
  selector: 'app-post-icons',
  templateUrl: './post-icons.component.html',
  styleUrls: ['./post-icons.component.css']
})
export class PostIconsComponent implements OnInit, OnDestroy {

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
  @Input()
  public localStorageShareLink: string;

  public changeLike: boolean;
  public changeBookmark: boolean;
  public likes: number | undefined;
  public comments: number | undefined;
  public icons = iconsSrc;
  public firePosts: Observable<PostStore[]>;
  private subscriptions: Subscription[] = [];
  public user: firebase.User | null = null;


  constructor(private authService: AuthService,
              private crudService: CrudService,
              private clipboard: Clipboard,
              private notifier: NotifierService,
              private dialog: MatDialog,
              private share: ShareService) {
  }

  public showNotification(type: string, message: string): void {
    this.notifier.notify(type, message);
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.authService.user$.pipe(
        filter((value: firebase.User | null) => !!value),
        tap((value: firebase.User | null) => this.user = value),
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
      ).subscribe()
    );
  }

  public copyShareLink() {
    this.crudService.handleData<PostStore>(Collections.POSTS).pipe(
      take(1),
      map((posts: PostStore[]) => {
        return posts.filter((i: PostStore) => i.id === this.postID)
      }),
      tap((isPost: PostStore[]) => {
        if (isPost.length !== 0) {
          this.clipboard.copy(this.sharePostId);
          localStorage.setItem('postLink', this.localStorageShareLink)
          this.showNotification('success', 'Link was copied!');
        } else {
          this.notifier.notify('error', 'Sorry! Post was deleted.')
          setTimeout(() => {
            this.dialog.closeAll();
          }, 1000)
        }
      })
    ).subscribe()
  }

  public openLikesDialog() {
    const likesPopup = this.dialog.open(LikesPopupComponent);
    likesPopup.componentInstance.postID = this.postID;
  }

  public updateLikes(id: string) {
    this.crudService.handleData<PostStore>(Collections.POSTS).pipe(
      take(1),
      map((posts: PostStore[]) => {
        return posts.filter((i: PostStore) => i.id === id)
      }),
      switchMap((isPost: PostStore[]) => {
        if (isPost.length !== 0) {
          return this.crudService.getUserDoc<PostStore>(Collections.POSTS, id).pipe(
            map((postFromStore: PostStore | undefined) => {
              const userIndex = postFromStore?.likes.indexOf(this.user?.uid!);
              if (userIndex === -1) {
                this.changeLike = true;
                return {
                  likes: postFromStore?.likes.concat(this.user?.uid!),
                }
              } else {
                const newArr: string[] | undefined = postFromStore?.likes.splice(userIndex!, 1);
                this.changeLike = false;
                return {
                  likes: postFromStore?.likes,
                };
              }
            }),
            switchMap(newPost => this.crudService.updateObject(Collections.POSTS, id, {...newPost}))
          )
        } else {
          this.notifier.notify('error', 'Sorry! Post was deleted.')
          setTimeout(() => {
            this.dialog.closeAll();
          }, 1000)
          return isPost;
        }
      })
    ).subscribe()
  }

  public addBookmark(id: string) {
    this.crudService.handleData<PostStore>(Collections.POSTS).pipe(
      take(1),
      map((posts: PostStore[]) => {
        return posts.filter((i: PostStore) => i.id === id)
      }),
      switchMap((isPost: PostStore[]) => {
        if (isPost.length !== 0) {
          return this.crudService.getUserDoc<PostStore>(Collections.POSTS, id).pipe(
            map((postFromStore: PostStore | undefined) => {
              const userIndex = postFromStore?.bookmarks.indexOf(this.user?.uid!);
              if (userIndex === -1) {
                this.changeBookmark = true;
                return {
                  bookmarkDate: new Date().getTime(),
                  bookmarks: postFromStore?.bookmarks.concat(this.user?.uid!),
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
            switchMap(newPost => this.crudService.updateObject(Collections.POSTS, id, {...newPost}))
          )
        } else {
          this.notifier.notify('error', 'Sorry! Post was deleted.')
          setTimeout(() => {
            this.dialog.closeAll();
          }, 1000)
          return isPost;
        }
      })
    ).subscribe()
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
