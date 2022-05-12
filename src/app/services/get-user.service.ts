import {Injectable} from '@angular/core';
import {CrudService} from "./crud/crud.service";
import {Collections} from "./crud/collections";
import {UserStore} from "../post";
import {AuthService} from "./auth/auth.service";
import firebase from "firebase/compat";
import {map, Observable, switchMap, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GetUserService {

  public user: firebase.User | null = null;
  public id: string;

  public fireUsers: Observable<UserStore[]>;

  constructor(private crudService: CrudService,
              private authService: AuthService) {
  }

  public getCurrentId() {
    this.authService.user$.pipe(
      tap((value: firebase.User | null) => this.user = value),
      switchMap((value: firebase.User | null) => {
        return this.crudService.handleMailData<UserStore>(Collections.USERS, '==', value?.email!).pipe(
          map(user => {
            user.forEach(curUser => {
              this.id = curUser.id
            })
          })
        )
      })
    ).subscribe()
  }

}
