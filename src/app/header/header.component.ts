import {Component, OnInit} from '@angular/core';
import {iconsSrc} from "../icons-path";
import {UserInfo} from "../user-info";
import {AuthService} from '../services/auth/auth.service';
import {Router} from '@angular/router';
import firebase from "firebase/compat/app";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public user: firebase.User | null = null;

  public icons = iconsSrc;

  public user1: UserInfo = {
    name: 'Walter Cobalt',
    description: 'You can find pictures here!',
    followers: 10,
    following: 3,
    logo: 'assets/images/8.jpg'
  }

  constructor(private authService: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.authService.user$.subscribe((value: firebase.User | null) => this.user = value);
  }

  public toggle: boolean = false;

  public togglePopup(): void {
    this.toggle = !this.toggle;
  }

  public login(): void {
    this.authService.googleSingIn().subscribe(
      () => this.authService.user$.subscribe(() => this.router.navigate(["/account"])));
  }

}
