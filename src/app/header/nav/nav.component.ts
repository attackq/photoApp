import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
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

  public fireUsers: Observable<UserStore[]> = this.crudService.handleData<UserStore>(Collections.USERS);

  constructor(private crudService: CrudService,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.user$.subscribe((value: firebase.User | null) => this.user = value);
    this.fireUsers.subscribe(value => console.log(value));
  }

}
