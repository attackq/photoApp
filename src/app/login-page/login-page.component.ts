import {ChangeDetectionStrategy, Component, HostBinding, OnInit, ViewEncapsulation} from '@angular/core';
import {AuthService} from '../services/auth/auth.service';
import {Router} from '@angular/router';
import firebase from "firebase/compat/app";
import {Observable, switchMap} from "rxjs";
import {UserStore} from "../post";
import {CrudService} from "../services/crud/crud.service";


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush

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
  }

  public login(): void {
    this.authService.googleSingIn().pipe(
      switchMap(() => this.authService.user$)
    ).subscribe(() => this.router.navigate(['/account/', this.user?.uid!]))
  }


}
