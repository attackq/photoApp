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

  public userStore: Observable<UserStore[]> = this.crudService.handleData<UserStore>(Collections.USERS);

  constructor(private afAuth: AngularFireAuth,
              private crudService: CrudService) {
    this.afAuth.authState.pipe(
      tap((value: firebase.User | null) => this.user$.next(value)),
      filter((value: firebase.User | null) => !!value),
      switchMap((value: firebase.User | null) => {
        return this.userStore.pipe(
          map((users: UserStore[]) => {
            users.forEach((user: UserStore) => {
              if (user.email !== value?.email) {
                const newUser: User = {
                  email: value?.email!,
                  name: value?.displayName!,
                  img: '111111111',
                  id: value?.uid!
                }
                console.log(newUser);
                return newUser
              } else {
                return null;
              }
            })
          }),
          switchMap(value => this.crudService.createObject(Collections.USERS, value)));
      })).subscribe()
  }


//   this.afAuth.authState.pipe(
//     tap((value: firebase.User | null) => this.user$.next(value)),
//   filter((value: firebase.User | null) => !!value),
//   switchMap((userFromSLogin: firebase.User | null) => {
//   return  this.userStore(тут делаешь запрос с кверей, то есть проверяешь есть ли пользователь с таким эмейломм).map((
//   userFromStore) => if(userFromStore) {
//     return null;
//   } else {
//   Если такой юзер в сторе уже есть, возвращаем нал, так как нам не интересно, если такого юзера нету, то возвращаем юзера с логина
//   return of(userFromSLogin)
// }
// ))
// }),
// filter((value: firebase.User | null) => !!value)
// switchMap((value: firebase.User | null) => this.crudService.createObject(Collections.USERS, user)))
// ).subscribe();

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
