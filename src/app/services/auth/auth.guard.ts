import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {map, take, tap} from "rxjs/operators";
import {AuthService} from "./auth.service";
import firebase from "firebase/compat/app";
import {NotifierService} from "angular-notifier";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService,
              private router: Router,
              private notifier: NotifierService) {
    this.notifier = notifier

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.user$.pipe(
      take(1),
      map((user: firebase.User | null) => !!user),
      tap((isLogged: boolean) => {
        console.log('authh')
        if (!isLogged) {
          this.router.navigate(['login']);
          this.notifier.notify('warning', 'Please, login into your account!')
        }
      }),
    )
  }

}
