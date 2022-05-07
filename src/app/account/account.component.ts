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

  public isFollow: boolean;

  public user: firebase.User | null = null;

  public fireUsers: Observable<UserStore[]>;
  public id: string | null;
  public currentUserID: string;

  // private subscription: Subscription;

  constructor(private authService: AuthService,
              public dialog: MatDialog,
              public crudService: CrudService,
              private activatedRoute: ActivatedRoute) {
    // this.subscription = activatedRoute.params.subscribe(params => this.id = params['id']);
  }

  ngOnInit(): void {
    // this.fireUsers = this.crudService.handleMailData<UserStore>(Collections.USERS, '==', this.user?.email!);
    // this.fireUsers = this.crudService.handleIdData<UserStore>(Collections.USERS, this.id);
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
      })
    ).subscribe();
  }

  public openDialog() {
    this.dialog.open(AccountPopupComponent);
  }

  public getFollowers(id: string) {
    this.authService.user$.pipe(
      filter((value: firebase.User | null) => !!value),
      switchMap((value: firebase.User | null) => {
        return this.crudService.getUserDoc<UserStore>(Collections.USERS, id).pipe(
          map((userFromStore: UserStore | undefined) => {
            const userIndex = userFromStore?.followers.indexOf(value?.uid!);
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
          switchMap(newUser => this.crudService.updateObject(Collections.USERS, id, {...newUser})
          ),
          switchMap((currentUser) => {
             return  this.crudService.handleIdData<UserStore>(Collections.USERS, '==',value?.uid!).pipe(
              tap(valueS => {
                valueS[0].following.concat(id)
                console.log(valueS[0].following)
              })
            )
          })
          )
      })
    ).subscribe();

  }
}


// switchMap((currentUser) => {
//   console.log(currentUser)
//   return this.crudService.getUserDoc<UserStore>(Collections.USERS, value?.uid!).pipe(
//     map((currentUser: UserStore | undefined) => {
//       // console.log(currentUser);
//       this.currentUserID = currentUser?.id!;
//       const currentUserIndex = currentUser?.following.indexOf(id);
//       if (currentUserIndex === -1) {
//         return {
//           following: currentUser?.following.concat(id),
//         }
//       } else {
//         const newArr: string[] | undefined = currentUser?.following.splice(currentUserIndex!, 1)
//         return {
//           following: currentUser?.following.concat(id)
//         }
//       }
//     }),
//     tap(newCurrentUser => this.crudService.updateObject(Collections.USERS, this.currentUserID, {...newCurrentUser}))
//   )
// })
