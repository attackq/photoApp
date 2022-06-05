import {
  Component,
  Input, OnDestroy,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import firebase from "firebase/compat";
import {AuthService} from "../services/auth/auth.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {RoutesPath} from "../routes-path";
import {ShareService} from "../services/share.service";

export interface FilterLinks {
  name: string;
  viewValue: string;
}

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class FilterComponent implements OnInit, OnDestroy {

  @Input()
  public userID: string;

  public user: firebase.User | null = null;

  public defaultLink: string = 'Filter';

  public routes = RoutesPath;

  private subscriptions: Subscription[] = [];

  public filterLinks: FilterLinks[] = [
    {name: 'Filter', viewValue: 'Filter'},
    {name: 'All photos', viewValue: 'All photos'},
    {name: 'Most liked', viewValue: 'Most liked'},
    {name: 'Most commented', viewValue: 'Most commented'}
  ]

  constructor(private authService: AuthService,
              private router: Router,
              private share: ShareService) {
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.authService.user$.subscribe((value: firebase.User | null) => this.user = value)
    );
  }

  public getDefaultValue() {
    this.defaultLink = 'Filter';
  }

  public setChangedValue(value: string) {
    this.share.filterString.next(value)
    this.router.navigate([this.routes.account, this.userID]);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}

