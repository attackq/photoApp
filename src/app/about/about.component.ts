import {Component, HostBinding, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {iconsSrc} from "../icons-path";
import firebase from "firebase/compat";
import {AuthService} from "../services/auth/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class AboutComponent implements OnInit, OnDestroy {

  @HostBinding('class.about') isAbout: boolean = true;

  public icons = iconsSrc;

  public user: firebase.User | null = null;

  private subscriptions: Subscription[] = [];

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.authService.user$.subscribe((value: firebase.User | null) => this.user = value)
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
