import {Component, Input, OnInit} from '@angular/core';
import {iconsSrc} from "../icons-path";
import {UserInfo} from "../user-info";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  icons = iconsSrc;

  public user1: UserInfo = {
    name: 'Walter Cobalt',
    description: 'You can find pictures here!',
    followers: 10,
    following: 3,
    logo: "assets/images/8.jpg"
  }

  constructor() {
  }

  ngOnInit(): void {
  }

  public toggle: boolean = false;

  public togglePopup(): void {
    this.toggle = !this.toggle;
  }

}
