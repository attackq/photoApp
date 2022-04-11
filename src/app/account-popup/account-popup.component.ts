import { Component, OnInit } from '@angular/core';
import {iconsSrc} from "../icons-path";

@Component({
  selector: 'app-account-popup',
  templateUrl: './account-popup.component.html',
  styleUrls: ['./account-popup.component.css']
})
export class AccountPopupComponent implements OnInit {

  icons = iconsSrc;

  constructor() { }

  ngOnInit(): void {
  }

}
