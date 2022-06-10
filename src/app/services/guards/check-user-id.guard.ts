import {Injectable} from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import {filter, Observable, switchMap, tap} from 'rxjs';
import {CrudService} from "../crud/crud.service";
import {UserStore} from "../../post";
import {Collections} from "../crud/collections";
import {map, take} from "rxjs/operators";
import {AuthService} from "../auth/auth.service";
import firebase from "firebase/compat";
import {NotifierService} from "angular-notifier";
import {RoutesPath} from "../../routes-path";

@Injectable({
  providedIn: 'root'
})
export class CheckUserIdGuard implements CanActivate {

  private routes = RoutesPath;

  constructor(private crudService: CrudService,
              private router: Router,
              private authService: AuthService,
              private notifier: NotifierService,
              private activatedRoute: ActivatedRoute) {
    this.notifier = notifier
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const id = route.params['id'];
    return this.authService.user$.pipe(
      filter((value: firebase.User | null) => !!value),
      switchMap((value: firebase.User | null) => {
        return this.crudService.handleIdData<UserStore>(Collections.USERS, '==', id).pipe(
          take(1),
          map((users: UserStore[]) => {
            return users.length !== 0
          }),
          tap((isId: boolean) => {
            if (!isId) {
              this.router.navigate([this.routes.account, value?.uid]);
              if (value?.uid !== id) {
                this.notifier.notify('warning', 'Invalid user ID')
              }
            }
          })
        )
      })
    )


  }

}
