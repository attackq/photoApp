import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from 'src/app/services/auth/auth.service';
import {Router} from '@angular/router';
import {RoutesPath} from "../../routes-path";
import {Subscription, switchMap} from "rxjs";

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit, OnDestroy {

  @Input()
  public username: string;

  public routes = RoutesPath;
  private subscriptions: Subscription[] = [];

  constructor(private authService: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  public logout(): void {
    this.subscriptions.push(
      this.authService.signOut().pipe(
        switchMap(() => this.authService.user$))
        .subscribe(() => this.router.navigate([this.routes.login]))
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
