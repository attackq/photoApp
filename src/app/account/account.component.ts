import {Component, Input, OnInit} from '@angular/core';
import {UserInfo} from "../user-info";
import firebase from "firebase/compat/app";
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  public user: firebase.User | null = null;

  public backgroundPath: string = 'assets/images/Mainbg.jpg';

  public user1: UserInfo = {
    name: 'Walter Cobalt',
    description: 'You can find pictures here!',
    followers: 10,
    following: 3,
    logo: "assets/images/8.jpg"
  }

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.user$.subscribe((value: firebase.User | null) => this.user = value);
  }

}
