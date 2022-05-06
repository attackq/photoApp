import {Component, HostBinding, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {UserStore} from "../post";
import {Collections} from "../services/crud/collections";
import {CrudService} from "../services/crud/crud.service";
import {Observable, Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {GetUserService} from "../services/get-user.service";

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class AccountPageComponent implements OnInit {

  public id: string;
  private subscription: Subscription;

  public fireUsers: Observable<UserStore[]>;

  constructor(private crudService: CrudService,
              private activatedRoute: ActivatedRoute,
              private getUserService: GetUserService) {
    this.subscription = activatedRoute.params.subscribe(params => this.id = params['id']);
  }

  @HostBinding('class.account__page') someField: boolean = true;

  ngOnInit(): void {
    // this.getUser()
    this.fireUsers = this.crudService.handleIdData<UserStore>(Collections.USERS, '==',this.id!);
    // this.fireUsers.subscribe(value => console.log(value))
  }

  // getUser() {
  //   const id: string | null = this.activatedRoute.snapshot.paramMap.get('id');
  //   this.getUserService.getHero(id!).subscribe(user =>{
  //     this.fireUsers = user;
  //     // console.log(user);
  //   } )
  // }
}
