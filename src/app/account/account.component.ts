import {Component, Input, OnInit} from '@angular/core';
import {UserInfo} from "../user-info";
import firebase from "firebase/compat/app";
import {AuthService} from '../services/auth/auth.service';
import {MatDialog} from '@angular/material/dialog';
import {AccountPopupComponent} from "../account-popup/account-popup.component";
import {Observable} from "rxjs";
import {Post, PostStore, UserStore} from "../post";
import {Collections} from "../services/crud/collections";
import {CrudService} from "../services/crud/crud.service";
import DocumentReference = firebase.firestore.DocumentReference;
import {map} from "rxjs/operators";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  public user: firebase.User | null = null;

  public fireUsers: Observable<UserStore[]>;

  constructor(private authService: AuthService,
              public dialog: MatDialog,
              public crudService: CrudService) {
  }

  ngOnInit(): void {
    this.authService.user$.subscribe((value: firebase.User | null) => this.user = value);
    this.fireUsers = this.crudService.handleMailData<UserStore>(Collections.USERS, this.user?.email!);
  }

  openDialog() {
    this.dialog.open(AccountPopupComponent);
  }

}


