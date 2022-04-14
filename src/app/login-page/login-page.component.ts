import {Component, HostBinding, Input, OnInit, ViewEncapsulation} from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import firebase from "firebase/compat/app";


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
  encapsulation:  ViewEncapsulation.None

})
export class LoginPageComponent implements OnInit {

  public bgPath: string = 'assets/images/logiwp.jpg';

  constructor(private authService: AuthService,
              private router: Router) { }

  @HostBinding('class.login__background') someField: boolean = true;

  ngOnInit(): void {
  }

  public login(): void {
    this.authService.googleSingIn().subscribe(
      () => this.authService.user$.subscribe(() => this.router.navigate(["/account"])));
  }

}
