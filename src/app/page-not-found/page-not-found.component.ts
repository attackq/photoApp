import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  HostBinding,
  OnDestroy,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import firebase from "firebase/compat";
import {AuthService} from "../services/auth/auth.service";
import {RoutesPath} from "../routes-path";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {NotifierService} from "angular-notifier";

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class PageNotFoundComponent implements OnInit, OnDestroy{

  @HostBinding('class.notfound') someField: boolean = true;
  public user: firebase.User | null = null;
  public routes = RoutesPath;
  private subscriptions: Subscription[] = [];


  constructor(private authService: AuthService,
              private router: Router) {
  }


  ngOnInit(): void {
    this.subscriptions.push(
      this.authService.user$.subscribe((value: firebase.User | null) => this.user = value)
    );
  }

  public routeToHome() {
    this.router.navigate([this.routes.account, this.user?.uid]);
  }

  public routeToLogin() {
    this.router.navigate([this.routes.login]);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}