import {Component, Input, OnInit} from '@angular/core';
import {UserInfo} from "../user-info";
import firebase from "firebase/compat/app";
import {AuthService} from '../services/auth/auth.service';
import {MatDialog} from '@angular/material/dialog';
import {AccountPopupComponent} from "../account-popup/account-popup.component";
import {filter, Observable, Subscription} from "rxjs";
import {Post, PostStore, UserStore} from "../post";
import {Collections} from "../services/crud/collections";
import {CrudService} from "../services/crud/crud.service";
import DocumentReference = firebase.firestore.DocumentReference;
import {map, switchMap} from "rxjs/operators";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  @Input()
  public username: string;
  @Input()
  public followers: [];
  @Input()
  public following: [];
  @Input()
  public status: string;
  @Input()
  public firestoreID: string;
  @Input()
  public userID: string;
  @Input()
  public background: string

  public user: firebase.User | null = null;

  public fireUsers: Observable<UserStore[]>;
  // public id: string;
  // private subscription: Subscription;

  constructor(private authService: AuthService,
              public dialog: MatDialog,
              public crudService: CrudService,
              private activatedRoute: ActivatedRoute) {
    // this.subscription = activatedRoute.params.subscribe(params => this.id = params['id']);
  }

  ngOnInit(): void {
    this.authService.user$.subscribe((value: firebase.User | null) => this.user = value);
    // this.fireUsers = this.crudService.handleMailData<UserStore>(Collections.USERS, '==', this.user?.email!);
    // this.fireUsers = this.crudService.handleIdData<UserStore>(Collections.USERS, this.id);
    // console.log(this.id)

    // this.getFollow();
  }

  public openDialog() {
    this.dialog.open(AccountPopupComponent);
  }

  // public getFollow() {
  //   this.crudService.handleMailData<UserStore>(Collections.USERS, '!=', this.user?.email!).pipe(
  //     map()
  //   );
  // this.authService.user$.pipe(
  //   filter((value: firebase.User | null) => !!value),
  //   switchMap((value: firebase.User | null) => {
  //     return this.crudService.handleMailData<UserStore>(Collections.USERS, '!=', this.user?.email!).pipe(
  //
  //     )
  //   })
  // )
  // }


  // public updateLikes(id: string) {
  //   this.authService.user$.pipe(
  //     filter((value: firebase.User | null) => !!value),
  //     switchMap((value: firebase.User | null) => {
  //       return this.crudService.getUserDoc<PostStore>(Collections.POSTS, id).pipe(
  //         map((postFromStore: PostStore | undefined) => {
  //           const userIndex = postFromStore?.likes.indexOf(value?.uid!);
  //           if (userIndex === -1) {
  //             this.addColor = true;
  //             return {
  //               likes: postFromStore?.likes.concat(value?.uid!),
  //             }
  //           } else {
  //             const newArr: string[] | undefined = postFromStore?.likes.splice(userIndex!, 1);
  //             this.addColor = false;
  //             return {
  //               likes: postFromStore?.likes,
  //             };
  //           }
  //         }),
  //         switchMap(newPost => this.crudService.updateObject(Collections.POSTS, id, {...newPost})))
  //     })
  //   ).subscribe();
  // }
}


