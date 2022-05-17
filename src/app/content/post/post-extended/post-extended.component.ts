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

  public commentsForm: FormGroup = new FormGroup({});
  public formControls: typeof FormControls = FormControls;
  public fireComments: Observable<NewComment[]>;

  constructor(private crudService: CrudService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.user$.subscribe((value: firebase.User | null) => this.user = value);

    this.fireUser = this.crudService.handleIdData<UserStore>(Collections.USERS, '==', this.creator);

    this.commentsForm.addControl(FormControls.comment, new FormControl('', Validators.required));

    this.fireComments = this.crudService.handleData<PostStore>(Collections.POSTS).pipe(
      map((post: PostStore[]) => {
        return post.filter((i: PostStore) => i.id === this.postID)
      }),
      switchMap( (value: PostStore[]) => {
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
          userID: this.user?.photoURL!,
          date: new Date().getTime()
        };
        let comments: Object[] | undefined = post?.comments
        comments?.push(comment);
        return this.crudService.updateObject(Collections.POSTS, this.postID, {comments})
      })
    ).subscribe()
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
