import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from "./auth/auth.service";
import {NotifierService} from "angular-notifier";

@Injectable({
  providedIn: 'root'
})
export class NotFoundGuard implements CanActivate {

  constructor(
    private router: Router,
    private notifier: NotifierService) {
    this.notifier = notifier
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.notifier.notify('error', 'Wrong URL');
    return true

  }

}
