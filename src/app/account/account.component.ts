import {Component, Input, OnInit} from '@angular/core';
import {UserInfo} from "../user-info";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  public backgroundPath: string = 'assets/images/Mainbg.jpg';

  public user1: UserInfo = {
    name: 'Walter Cobalt',
    description: 'You can find pictures here!',
    followers: 10,
    following: 3,
    logo: "assets/images/8.jpg"
  }

  constructor() { }

  ngOnInit(): void {
  }

}
