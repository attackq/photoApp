import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../auth/auth.service";
import {map, take, tap} from "rxjs/operators";
import firebase from "firebase/compat";
import {user} from "@angular/fire/auth";
import {NotifierService} from "angular-notifier";
import {RoutesPath} from "../../routes-path";

@Injectable({
  providedIn: 'root'
})
export class CheckUserGuard implements CanActivate {

  private routes = RoutesPath;

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
      map((value: firebase.User | null) => {
        const user = !!value;
        return !user;
      }),
      tap((isLogged: boolean) => {
        if (!isLogged) {
          this.router.navigate([this.routes.feed]);
        }
      })
    )
  }

}
