import {Component, HostBinding, Input, OnDestroy, OnInit} from '@angular/core';
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

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit, OnDestroy {

  @Input()
  public firestoreID: string;
  @Input()
  public userID: string;

  public background: string;
  public userLogo: string;
  public isFollow: boolean;
  public isBlocked: boolean;
  public user: firebase.User | null = null;
  public authID: string;

  private subscriptions: Subscription[] = [];


  constructor(private authService: AuthService,
              private dialog: MatDialog,
              private crudService: CrudService) {
  }


  ngOnInit(): void {
    this.subscriptions.push(
      this.authService.user$.pipe(
        tap((value: firebase.User | null) => this.user = value),
        filter((value: firebase.User | null) => !!value),
        switchMap(() => {
          return this.crudService.handleIdData<UserStore>(Collections.USERS, '==', this.userID).pipe(
            tap((userFromStore: UserStore[]) => {
              this.isFollow = userFromStore[0].followers.includes(this.user?.uid!);
              this.background = userFromStore[0].background;
              this.userLogo = userFromStore[0].logo;
            }))
        }),
        switchMap(() => {
          return this.crudService.handleIdData<UserStore>(Collections.USERS, '==', this.user?.uid!).pipe(
            tap((currentUser: UserStore[]) => {
              this.authID = currentUser[0].id;
              this.isBlocked = currentUser[0].blocked.includes(this.userID);
            }))
        })
      ).subscribe()
    )
  }

  public openAddPostDialog() {
    this.dialog.open(AccountPopupComponent, {
      autoFocus: false
    });
  }

  public updateFollowers(id: string) {
    this.subscriptions.push(
      this.crudService.getUserDoc<UserStore>(Collections.USERS, id).pipe(
        map((userFromStore: UserStore | undefined) => {
          const userIndex = userFromStore?.followers.indexOf(this.user?.uid!);
          if (userIndex === -1) {
            return {
              followers: userFromStore?.followers.concat(this.user?.uid!),
            }
          } else {
            const newArr: string[] | undefined = userFromStore?.followers.splice(userIndex!, 1);
            return {
              followers: userFromStore?.followers,
            }
          }
        }),
        switchMap(newFollowers => this.crudService.updateObject(Collections.USERS, id, {...newFollowers})
        )).subscribe()
    )
  }

  public updateFollowing(id: string) {
    this.subscriptions.push(
      this.crudService.getUserDoc<UserStore>(Collections.USERS, id).pipe(
        map((currentUserFromStore: UserStore | undefined) => {
          const followingInd = currentUserFromStore?.following.indexOf(this.userID);
          if (followingInd == -1) {
            return {
              following: currentUserFromStore?.following.concat(this.userID),
            }
          } else {
            const newArray: string[] | undefined = currentUserFromStore?.following.splice(followingInd!, 1)
            return {
              following: currentUserFromStore?.following
            }
          }
        }),
        switchMap(newFollowing => this.crudService.updateObject(Collections.USERS, id, {...newFollowing}))
      ).subscribe()
    )
  }

  public updateBlocked(id: string) {
    this.subscriptions.push(
      this.crudService.getUserDoc<UserStore>(Collections.USERS, id).pipe(
        map((currentUserFromStore: UserStore | undefined) => {
          const blockedInd = currentUserFromStore?.blocked.indexOf(this.userID);
          if (blockedInd == -1) {
            return {
              blocked: currentUserFromStore?.blocked.concat(this.userID),
            }
          } else {
            const newArray: string[] | undefined = currentUserFromStore?.blocked.splice(blockedInd!, 1)
            return {
              blocked: currentUserFromStore?.blocked
            }
          }
        }),
        switchMap(newBlocked => this.crudService.updateObject(Collections.USERS, id, {...newBlocked}))
      ).subscribe()
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
