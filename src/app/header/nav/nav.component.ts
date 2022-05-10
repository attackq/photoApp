import { Component, OnInit } from '@angular/core';
import {Observable, switchMap, tap} from "rxjs";
import {PostStore, UserStore} from "../../post";
import {Collections} from "../../services/crud/collections";
import {CrudService} from "../../services/crud/crud.service";
import firebase from "firebase/compat";
import {AuthService} from "../../services/auth/auth.service";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  public user: firebase.User | null = null;

  public fireUsers: Observable<UserStore[]>;

  constructor(private crudService: CrudService,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.user$.subscribe((value: firebase.User | null) => this.user = value);
    this.fireUsers = this.crudService.handleMailData<UserStore>(Collections.USERS, '!=', this.user?.email!)

    // this.authService.user$.pipe(
    //   tap((value: firebase.User | null) => this.user = value),
    //   switchMap((value: firebase.User | null) => {
    //     return this.fireUsers = this.crudService.handleMailData<UserStore>(Collections.USERS, '!=', value?.email!)})
    // ).subscribe()
  }

}
