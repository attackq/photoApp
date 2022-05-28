import {Component, HostBinding, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {UserStore} from "../post";
import {Collections} from "../services/crud/collections";
import {CrudService} from "../services/crud/crud.service";
import {filter, Observable, Subscription, switchMap, tap} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {take} from "rxjs/operators";
import {AuthService} from "../services/auth/auth.service";
import firebase from "firebase/compat";
import {iconsSrc} from "../icons-path";

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class AccountPageComponent implements OnInit {

  public fireUsers: Observable<UserStore[]>;
  public isShow: boolean;
  public id: string;
  public usedId: string

  public icons = iconsSrc

  constructor(private crudService: CrudService,
              private activatedRoute: ActivatedRoute,
              private authService: AuthService) {
  }

  @HostBinding('class.account__page') someField: boolean = true;

  ngOnInit(): void {
    this.fireUsers = this.activatedRoute.params.pipe(
      switchMap(params => this.crudService.handleIdData<UserStore>(Collections.USERS, '==', params['id']).pipe(take(1)))
    )

    this.authService.user$.pipe(
      filter((value: firebase.User | null) => !!value),
      switchMap((value: firebase.User | null) => this.crudService.handleMailData<UserStore>(Collections.USERS, '==', value?.email!).pipe(
        tap(user => this.usedId = user[0].userID)
      )),
    ).subscribe()

  }
}
