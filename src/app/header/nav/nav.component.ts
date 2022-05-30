import {Component, OnDestroy, OnInit} from '@angular/core';
import {filter, Observable, Subscription, switchMap, tap} from "rxjs";
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
export class NavComponent implements OnInit, OnDestroy {

  public user: firebase.User | null = null;
  public routes = RoutesPath;
  public fireUsers: Observable<UserStore[]>;
  private subscriptions: Subscription[] = [];

  constructor(private crudService: CrudService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.authService.user$.subscribe((value: firebase.User | null) => this.user = value)
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
