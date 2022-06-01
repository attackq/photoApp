import {ChangeDetectionStrategy, Component, HostBinding, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {AuthService} from '../services/auth/auth.service';
import {Router} from '@angular/router';
import firebase from "firebase/compat/app";
import {Observable, Subscription, switchMap} from "rxjs";
import {UserStore} from "../post";
import {CrudService} from "../services/crud/crud.service";
import {RoutesPath} from "../routes-path";


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
  encapsulation: ViewEncapsulation.None,

})
export class LoginPageComponent implements OnInit, OnDestroy {

  @HostBinding('class.login__background') isLoginBg: boolean = true;

  public user: firebase.User | null = null;

  public fireUsers: Observable<UserStore[]>;
  public routes = RoutesPath;

  public bgPath: string = 'assets/images/logiwp.jpg';

  private subscriptions: Subscription[] = [];

  constructor(private authService: AuthService,
              private crudService: CrudService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.authService.user$.subscribe((value: firebase.User | null) => this.user = value);
  }

  public login(): void {
    this.subscriptions.push(
      this.authService.googleSingIn().pipe(
        switchMap(() => this.authService.user$))
        .subscribe(() => this.router.navigate([this.routes.account, this.user?.uid!]))
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
