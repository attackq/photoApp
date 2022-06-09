import {Component, HostBinding, Input, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {UserStore} from "../post";
import {Collections} from "../services/crud/collections";
import {CrudService} from "../services/crud/crud.service";
import {filter, Observable, Subscription, switchMap, tap} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {map, take} from "rxjs/operators";
import {AuthService} from "../services/auth/auth.service";
import firebase from "firebase/compat";
import {iconsSrc} from "../icons-path";

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class AccountPageComponent implements OnInit, OnDestroy {

  public fireUsers: Observable<UserStore[]>;
  public userId: string;
  public icons = iconsSrc;
  private subscriptions: Subscription[] = [];
  public user: firebase.User | null = null;
  public userIdFromAuth: string;

  constructor(private crudService: CrudService,
              private activatedRoute: ActivatedRoute,
              private authService: AuthService) {
  }

  @HostBinding('class.account__page') someField: boolean = true;

  ngOnInit(): void {
    this.fireUsers = this.activatedRoute.params.pipe(
      switchMap(params => this.crudService.handleIdData<UserStore>(Collections.USERS, '==', params['id']))
    );

    this.subscriptions.push(
      this.authService.user$.pipe(
        filter((value: firebase.User | null) => !!value),
        tap((value: firebase.User | null) => {
          this.user = value;
          this.userIdFromAuth = value?.uid!;
        }),
        switchMap((value: firebase.User | null) => this.crudService.handleMailData<UserStore>(Collections.USERS, '==', value?.email!).pipe(
          tap(user => this.userId = user[0].userID)
        ))
      ).subscribe()
    )

  }

  public trackBlockedUser(index: number, user: UserStore) {
    return user.id;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
