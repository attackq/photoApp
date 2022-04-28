import {Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import firebase from "firebase/compat/app";
import AuthProvider = firebase.auth.AuthProvider;
import {filter, from, Observable, ReplaySubject, switchMap, tap} from "rxjs";
import UserCredential = firebase.auth.UserCredential;
import {user} from "@angular/fire/auth";
import {Collections} from "../crud/collections";
import {CrudService} from "../crud/crud.service";
import {PostStore, User, UserStore} from "../../post";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user$: ReplaySubject<firebase.User | null> = new ReplaySubject<firebase.User | null>(1);

  public userStore: Observable<UserStore[]> = this.crudService.handleData<UserStore>(Collections.USERS);

  constructor(private afAuth: AngularFireAuth,
              private crudService: CrudService) {
    this.afAuth.authState.pipe(
      tap((value: firebase.User | null) => this.user$.next(value)),
      filter((value: firebase.User | null) => !!value),
      switchMap((value: firebase.User | null) => {
        const user: User = {
          email: value?.email!,
          name: value?.displayName!,
          img: value?.photoURL!,
          id: value?.uid!
        }
        return this.crudService.createObject(Collections.USERS, user);
      })).subscribe();
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
