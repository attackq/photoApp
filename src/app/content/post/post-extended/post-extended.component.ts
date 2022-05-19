import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {filter, from, Observable, of, switchMap} from "rxjs";
import {EditUser, NewComment, PostStore, UserStore} from "../../../post";
import {Collections} from "../../../services/crud/collections";
import {CrudService} from "../../../services/crud/crud.service";
import firebase from "firebase/compat";
import {AuthService} from "../../../services/auth/auth.service";
import {iconsSrc} from "../../../icons-path";
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {FormControls} from "../../../controls";
import {map, tap} from "rxjs/operators";
import {NewCommand} from "@angular/cli/commands/new-impl";

@Component({
  selector: 'app-post-extended',
  templateUrl: './post-extended.component.html',
  styleUrls: ['./post-extended.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class PostExtendedComponent implements OnInit {

  @Input()
  public postImg: string | null = '';
  @Input()
  public postDesc: string = '';
  @Input()
  public postDate: number;
  @Input()
  public postID: string;
  @Input()
  public creator: string;

  public icons = iconsSrc;

  public user: firebase.User | null = null;

  public fireUser: Observable<UserStore[]>;

  public currentID: string;
  public commentLogo: string

  public commentsForm: FormGroup = new FormGroup({});
  public formControls: typeof FormControls = FormControls;
  public fireComments: Observable<NewComment[]>;

  constructor(private crudService: CrudService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.user$.pipe(
      tap((value: firebase.User | null) => this.user = value),
      switchMap((value: firebase.User | null) => {
        return this.crudService.handleMailData<UserStore>(Collections.USERS, '==', value?.email!).pipe(
          tap((currentUser: UserStore[]) => {
            this.currentID = currentUser[0].userID;
            this.commentLogo = currentUser[0].logo
          })
        )
      })
    ).subscribe()

    this.fireUser = this.crudService.handleIdData<UserStore>(Collections.USERS, '==', this.creator);

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

  public addComment() {
    const inputComment = this.commentsForm.controls[FormControls.comment].value;
    this.crudService.getUserDoc<PostStore>(Collections.POSTS, this.postID).pipe(
      map((post: PostStore | undefined) => {
        const comment: NewComment = {
          text: inputComment,
          date: new Date().getTime(),
          createdBy: this.user?.uid!
        };
        let comments: Object[] | undefined = post?.comments
        comments?.push(comment);
        return this.crudService.updateObject(Collections.POSTS, this.postID, {comments})
      })
    ).subscribe()
  }

  public deleteComment(time: number) {
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
}
