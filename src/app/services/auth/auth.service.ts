import {Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import firebase from "firebase/compat/app";
import AuthProvider = firebase.auth.AuthProvider;
import {from, Observable, ReplaySubject} from "rxjs";
import UserCredential = firebase.auth.UserCredential;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user$: ReplaySubject<firebase.User | null> = new ReplaySubject<firebase.User|null>(1);

  constructor(private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe((value: firebase.User | null) => this.user$.next(value));
  }

  public googleSingIn(): Observable<UserCredential> {
    return this.authWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  public authWithPopup(provider: AuthProvider) : Observable<UserCredential>{
    return from(this.afAuth.signInWithPopup(provider));
  }

  public signOut(): Observable<void> {
    return from(this.afAuth.signOut());
  }
}
