import {ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {iconsSrc} from "../../icons-path";
import {MatDialog} from "@angular/material/dialog";
import {EditUserComponent} from "./edit-user/edit-user.component";
import firebase from "firebase/compat";
import {AuthService} from "../../services/auth/auth.service";
import {Observable, Subscription} from "rxjs";
import {UserStore} from "../../post";
import {CrudService} from "../../services/crud/crud.service";
import {Collections} from "../../services/crud/collections";
import {FollowersComponent} from "./followers/followers.component";
import {FollowingComponent} from "./following/following.component";

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountInfoComponent implements OnInit, OnDestroy {

  @Input()
  public firestoreID: string;
  @Input()
  public userID: string;
  @Input()
  public status: string;
  @Input()
  public nickname: string;

  public icons = iconsSrc;

  public user: firebase.User | null = null;

  public firestoreUser: Observable<UserStore[]>;

  private subscriptions: Subscription[] = [];

  constructor(private dialog: MatDialog,
              private authService: AuthService,
              private crudService: CrudService) {
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.authService.user$.subscribe((value: firebase.User | null) => this.user = value)
    )
    this.firestoreUser = this.crudService.handleIdData<UserStore>(Collections.USERS, '==', this.userID);
  }

  public openEditUserDialog(id: string) {
    let editPopup = this.dialog.open(EditUserComponent);
    editPopup.componentInstance.firestoreID = id;
    editPopup.componentInstance.status = this.status;
    editPopup.componentInstance.nickname = this.nickname;

  }

  public openFollowersDialog() {
    let followerPopup = this.dialog.open(FollowersComponent)
    followerPopup.componentInstance.userID = this.userID;
  }

  public openFollowingDialog() {
    let followingPopup = this.dialog.open(FollowingComponent);
    followingPopup.componentInstance.userID = this.userID;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
