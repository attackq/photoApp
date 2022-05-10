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
import {map, switchMap, tap} from "rxjs/operators";
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
  public followers: string[];
  @Input()
  public following: string[];
  @Input()
  public status: string;
  @Input()
  public firestoreID: string;
  @Input()
  public userID: string;
  @Input()
  public background: string
  @Input()
  public userLogo: string;

  public isFollow: boolean;

  public user: firebase.User | null = null;

  public fireUsers: Observable<UserStore[]>;
  public currentUser: UserStore[] | undefined;

  public userFromStoreId: string;


  constructor(private authService: AuthService,
              public dialog: MatDialog,
              public crudService: CrudService) {
  }

  ngOnInit(): void {
    // this.fireUsers = this.crudService.handleMailData<UserStore>(Collections.USERS, '==', this.user?.email!);
    // this.currentUser = this.crudService.handleIdData<UserStore>(Collections.USERS, '==', this.user?.uid!);
    // console.log(this.id)
    // this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.authService.user$.pipe(
      tap((value: firebase.User | null) => this.user = value),
      filter((value: firebase.User | null) => !!value),
      switchMap((value: firebase.User | null) => {
        return this.crudService.getUserDoc<UserStore>(Collections.USERS, this.firestoreID).pipe(
          tap((modifiedUser: UserStore | undefined) => {
            this.isFollow = !!(modifiedUser?.followers.includes(value?.uid!));
          }))
      }),
      switchMap((currentUser: UserStore | undefined) => {
        return this.crudService.handleIdData<UserStore>(Collections.USERS, '==', this.user?.uid!).pipe(
          tap((user: UserStore[] | undefined) => {
            this.currentUser = user;
          })
        )
      })
    ).subscribe();
  }

  public openDialog() {
    this.dialog.open(AccountPopupComponent);
  }

  public getFollowers(id: string, currentID: string) {
    this.authService.user$.pipe(
      filter((value: firebase.User | null) => !!value),
      switchMap((value: firebase.User | null) => {
        return this.crudService.getUserDoc<UserStore>(Collections.USERS, id).pipe(
          map((userFromStore: UserStore | undefined) => {
            const userIndex = userFromStore?.followers.indexOf(value?.uid!);
            this.userFromStoreId = userFromStore?.userID!;
            if (userIndex === -1) {
              this.isFollow = true;
              return {
                followers: userFromStore?.followers.concat(value?.uid!),
              }
            } else {
              const newArr: string[] | undefined = userFromStore?.followers.splice(userIndex!, 1);
              this.isFollow = false;
              return {
                followers: userFromStore?.followers,
              };
            }
          }),
          switchMap(newFollowers => this.crudService.updateObject(Collections.USERS, id, {...newFollowers})
          ),
          switchMap((currentUser) => {
            return this.crudService.getUserDoc<UserStore>(Collections.USERS, currentID).pipe(
              map((currentUserFromStore: UserStore | undefined) => {
                const followingInd = currentUserFromStore?.following.indexOf(this.userFromStoreId);
                if (followingInd === -1) {
                  return {
                    following: currentUserFromStore?.following.concat(this.userFromStoreId),
                  }
                } else {
                  const newArray: string[] | undefined = currentUserFromStore?.following.splice(followingInd!, 1)
                  return {
                    following: currentUserFromStore?.following
                  }
                }
              }),
              switchMap( newFollowing => this.crudService.updateObject(Collections.USERS, currentID, {...newFollowing}))
            )
          }),
        )
      })
    ).subscribe();
  }


}
