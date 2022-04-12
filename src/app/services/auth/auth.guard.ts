import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {map, take, tap} from "rxjs/operators";
import {AuthService} from "./auth.service";
import firebase from "firebase/compat/app";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.user$.pipe(
      take(1),
      map((user: firebase.User | null) => !!user),
      tap((isLogged: boolean) => {
        if (!isLogged) {
          console.log('you are not authorized');
        }
      }),
    )
  }

}
