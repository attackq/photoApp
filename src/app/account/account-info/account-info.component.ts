import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {iconsSrc} from "../../icons-path";
import {MatDialog} from "@angular/material/dialog";
import {EditUserComponent} from "./edit-user/edit-user.component";
import firebase from "firebase/compat";
import {AuthService} from "../../services/auth/auth.service";
import {Observable} from "rxjs";
import {UserStore} from "../../post";
import {CrudService} from "../../services/crud/crud.service";
import {Collections} from "../../services/crud/collections";

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountInfoComponent implements OnInit {


  @Input()
  public firestoreID: string;
  @Input()
  public userID: string;

  public icons = iconsSrc;

  public user: firebase.User | null = null;

  public firestoreUser: Observable<UserStore[]>

  constructor(private dialog: MatDialog,
              private authService: AuthService,
              private crudService: CrudService) { }

  public openDialog(id: string) {
    let editPopup = this.dialog.open(EditUserComponent);
    editPopup.componentInstance.firestoreID = id;
  }

  ngOnInit(): void {
    this.authService.user$.subscribe((value: firebase.User | null) => this.user = value);

    this.firestoreUser = this.crudService.handleIdData<UserStore>(Collections.USERS, '==', this.userID)

  }

}
