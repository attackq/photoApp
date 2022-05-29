import { Component, OnInit } from '@angular/core';
import {filter, Observable, switchMap, tap} from "rxjs";
import {PostStore, UserStore} from "../../post";
import {Collections} from "../../services/crud/collections";
import {CrudService} from "../../services/crud/crud.service";
import firebase from "firebase/compat";
import {AuthService} from "../../services/auth/auth.service";
import {RoutesPath} from "../../routes-path";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  public user: firebase.User | null = null;
  public routes = RoutesPath;

  public fireUsers: Observable<UserStore[]>;

  constructor(private crudService: CrudService,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.fireUsers = this.authService.user$.pipe(
      filter((value: firebase.User | null) => !!value),
      tap((value: firebase.User | null) => this.user = value),
      switchMap((value: firebase.User | null) => {
        return this.crudService.handleMailData<UserStore>(Collections.USERS, '!=', value?.email!)
      })
    )
    // this.authService.user$.subscribe((value: firebase.User | null) => this.user = value);

  }

}
