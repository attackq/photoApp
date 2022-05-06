import {Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import firebase from "firebase/compat/app";
import AuthProvider = firebase.auth.AuthProvider;
import {filter, from, Observable, ReplaySubject, switchMap, tap} from "rxjs";
import UserCredential = firebase.auth.UserCredential;
import {Collections} from "../crud/collections";
import {CrudService} from "../crud/crud.service";
import {User} from "../../post";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user$: ReplaySubject<firebase.User | null> = new ReplaySubject<firebase.User | null>(1);

  constructor(private afAuth: AngularFireAuth,
              private crudService: CrudService) {
    this.afAuth.authState.pipe(
      tap((value: firebase.User | null) => this.user$.next(value)),
      filter((value: firebase.User | null) => !!value),
      switchMap((userFromLogin: firebase.User | null) => {
        return this.crudService.handleMailData(Collections.USERS, '==', userFromLogin?.email!).pipe(
          map(userFromStore => {
            if (userFromStore.length !== 0) {
              return null;
            } else {
              const user: User = {
                email: userFromLogin?.email!,
                name: userFromLogin?.displayName!,
                logo: userFromLogin?.photoURL!,
                userID: userFromLogin?.uid!,
                status: 'You can find pictures here!',
                background: 'https://firebasestorage.googleapis.com/v0/b/photoapp-2cd29.appspot.com/o/default_background_3.jpg?alt=media&token=35ef59de-dac7-401d-9c9d-5dde260dafbf',
                followers: [],
                following: []
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
