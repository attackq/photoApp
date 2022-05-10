import {Component, HostBinding, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {AuthService} from '../services/auth/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import firebase from "firebase/compat/app";
import {Observable, Subscription, switchMap} from "rxjs";
import {UserStore} from "../post";
import {Collections} from "../services/crud/collections";
import {CrudService} from "../services/crud/crud.service";
import {tap} from "rxjs/operators";


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class LoginPageComponent implements OnInit {

  public user: firebase.User | null = null;

  public fireUsers: Observable<UserStore[]>;

  public bgPath: string = 'assets/images/logiwp.jpg';

  constructor(private authService: AuthService,
              private crudService: CrudService,
              private router: Router) {
  }

  @HostBinding('class.login__background') someField: boolean = true;

  ngOnInit(): void {
    this.authService.user$.subscribe((value: firebase.User | null) => this.user = value);
    // this.fireUsers = this.crudService.handleMailData<UserStore>(Collections.USERS, '==', this.user?.email!)
  }

  public login(): void {
    this.authService.googleSingIn().subscribe(
      () => this.authService.user$.subscribe(() => this.router.navigate(['/account/', this.user?.uid!])));
  }

  // public login(): void {
  //   this.authService.googleSingIn().subscribe()
  // }


}
