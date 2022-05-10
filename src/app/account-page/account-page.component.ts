import {Component, HostBinding, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {UserStore} from "../post";
import {Collections} from "../services/crud/collections";
import {CrudService} from "../services/crud/crud.service";
import {Observable, Subscription, switchMap, tap} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {GetUserService} from "../services/get-user.service";

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class AccountPageComponent implements OnInit {

  public fireUsers: Observable<UserStore[]>;

  constructor(private crudService: CrudService,
              private activatedRoute: ActivatedRoute) {
  }

  @HostBinding('class.account__page') someField: boolean = true;

  ngOnInit(): void {
    this.fireUsers = this.activatedRoute.params.pipe(
      tap(value => console.log(value)),
      switchMap(params => this.crudService.handleIdData<UserStore>(Collections.USERS, '==', params['id']))
    )
  }
}
