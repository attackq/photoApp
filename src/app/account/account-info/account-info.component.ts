import {Component, Input, OnInit} from '@angular/core';
import {iconsSrc} from "../../icons-path";
import {MatDialog} from "@angular/material/dialog";
import {EditPopupComponent} from "../../content/post/edit-popup/edit-popup.component";
import {EditUserComponent} from "./edit-user/edit-user.component";

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.css']
})
export class AccountInfoComponent implements OnInit {

  @Input()
  public username: string;
  @Input()
  public followers: number;
  @Input()
  public following: number;
  @Input()
  public status: string;
  @Input()
  public firestoreID: string;

  icons = iconsSrc;

  constructor(private dialog: MatDialog) { }

  public openDialog(id: string) {
    let editPopup = this.dialog.open(EditUserComponent);
    editPopup.componentInstance.firestoreID = id;
  }

  ngOnInit(): void {
  }

}
