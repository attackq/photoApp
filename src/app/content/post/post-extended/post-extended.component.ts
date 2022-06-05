import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {filter, from, Observable, of, Subscription, switchMap} from "rxjs";
import {EditUser, NewComment, PostStore, UserStore} from "../../../post";
import {Collections} from "../../../services/crud/collections";
import {CrudService} from "../../../services/crud/crud.service";
import firebase from "firebase/compat";
import {AuthService} from "../../../services/auth/auth.service";
import {iconsSrc} from "../../../icons-path";
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {FormControls} from "../../../controls";
import {map, tap} from "rxjs/operators";
import {RoutesPath} from "../../../routes-path";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {ShareService} from "../../../services/share.service";

@Component({
  selector: 'app-post-extended',
  templateUrl: './post-extended.component.html',
  styleUrls: ['./post-extended.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class PostExtendedComponent implements OnInit, OnDestroy {

  @Input()
  public postImg: string | null;
  @Input()
  public postDesc: string;
  @Input()
  public postDate: number;
  @Input()
  public postID: string;
  @Input()
  public sharePostId: string;
  @Input()
  public postCreator: string;

  public isShare: boolean = true;
  public icons = iconsSrc;
  public routes = RoutesPath;
  public user: firebase.User | null = null;
  public fireUser: Observable<UserStore[]>;
  public currentID: string;
  public commentLogo: string
  public commentsForm: FormGroup = new FormGroup({});
  public formControls: typeof FormControls = FormControls;
  public fireComments: Observable<NewComment[]>;
  private subscriptions: Subscription[] = [];

  constructor(private crudService: CrudService,
              private authService: AuthService,
              private router: Router,
              private dialog: MatDialog,
              private share: ShareService) {
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.authService.user$.pipe(
        tap((value: firebase.User | null) => this.user = value),
        switchMap((value: firebase.User | null) => {
          return this.crudService.handleMailData<UserStore>(Collections.USERS, '==', value?.email!).pipe(
            tap((currentUser: UserStore[]) => {
              this.currentID = currentUser[0].userID;
              this.commentLogo = currentUser[0].logo;
            })
          )
        })
      ).subscribe()
    )

    this.fireUser = this.crudService.handleIdData<UserStore>(Collections.USERS, '==', this.postCreator);

    this.commentsForm.addControl(FormControls.comment, new FormControl('', Validators.compose([Validators.required, Validators.maxLength(200)])));

    this.fireComments = this.crudService.handleData<PostStore>(Collections.POSTS).pipe(
      map((post: PostStore[]) => {
        return post.filter((i: PostStore) => i.id === this.postID)
      }),
      switchMap((value: PostStore[]) => {
        return of(value[0].comments)
      })
    )
  }

  public routeToUser(id: string) {
    this.share.customerLink.next(id);
  }

  public addComment() {
    const inputComment = this.commentsForm.controls[FormControls.comment].value;
    this.subscriptions.push(
      this.crudService.getUserDoc<PostStore>(Collections.POSTS, this.postID).pipe(
        map((post: PostStore | undefined) => {
          const comment: NewComment = {
            text: inputComment,
            date: new Date().getTime(),
            createdBy: this.user?.uid!,
            logo: this.commentLogo
          };
          let comments: Object[] | undefined = post?.comments
          comments?.push(comment);
          return this.crudService.updateObject(Collections.POSTS, this.postID, {comments})
        })
      ).subscribe()
    )
  }

  public deleteComment(time: number) {
    this.subscriptions.push(
      this.crudService.getUserDoc<PostStore>(Collections.POSTS, this.postID).pipe(
        map((post: PostStore | undefined) => {
          const currentComment: NewComment[] | undefined = post?.comments.filter((i: NewComment) => i.date === time);
          const ind = post?.comments.indexOf(currentComment![0])
          if (ind !== -1) {
            const array = post?.comments.splice(ind!, 1)
            return {
              comments: post?.comments
            }
          } else {
            return {
              comments: post?.comments
            }
          }
        }),
        switchMap(comments => this.crudService.updateObject(Collections.POSTS, this.postID, {...comments}))
      ).subscribe()
    )
  }

  public isControlValid(controlName: string): boolean {
    const control: AbstractControl | undefined = this.commentsForm?.controls[controlName];
    if (control) {
      return control.invalid && (control.dirty || control.touched);
    } else {
      return false;
    }
  }

  public submitFrom(): void {
    if (this.commentsForm.valid) {
      this.addComment();
      this.commentsForm?.reset();
    } else {
      alert('Error');
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
