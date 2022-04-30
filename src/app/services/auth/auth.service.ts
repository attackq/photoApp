import {Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import firebase from "firebase/compat/app";
import {collection, query, where} from "firebase/firestore";
import AuthProvider = firebase.auth.AuthProvider;
import {filter, from, Observable, of, ReplaySubject, switchMap, tap} from "rxjs";
import UserCredential = firebase.auth.UserCredential;
import {Collections} from "../crud/collections";
import {CrudService} from "../crud/crud.service";
import {User, UserStore} from "../../post";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user$: ReplaySubject<firebase.User | null> = new ReplaySubject<firebase.User | null>(1);

  public userGmail: User = {
    email: 'rastpk@gmail.com',
    name: 'ge',
    img: 'na',
    id: 'sss'
  }
  public userRambler: User = {
    email: 'rastpk@rambler.ru',
    name: 'ge',
    img: 'na',
    id: 'sss'
  }

  constructor(private afAuth: AngularFireAuth,
              private crudService: CrudService) {
    this.afAuth.authState.pipe(
      tap((value: firebase.User | null) => this.user$.next(value)),
      filter((value: firebase.User | null) => !!value),
      switchMap((userFromLogin: firebase.User | null) => {
        return this.crudService.handleMailData(Collections.USERS, userFromLogin?.email!).pipe(
          map(userFromStore => {
            if (userFromStore.length !== 0) {
              return null;
            } else {
              const user: User = {
                email: userFromLogin?.email!,
                name: userFromLogin?.displayName!,
                img: userFromLogin?.photoURL!,
                id: userFromLogin?.uid!
              }
              return user;
            }
          }),
          filter((value: User | null) => !!value),
          switchMap(newUser => this.crudService.createObject(Collections.USERS, newUser)))
      })).subscribe()
  }

  public googleSingIn(): Observable<UserCredential> {
    return this.authWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  public authWithPopup(provider: AuthProvider): Observable<UserCredential> {
    return from(this.afAuth.signInWithPopup(provider));
  }

  public signOut(): Observable<void> {
    return from(this.afAuth.signOut());
  }


}
