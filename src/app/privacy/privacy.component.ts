import {Component, HostBinding, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import firebase from "firebase/compat";
import {AuthService} from "../services/auth/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class PrivacyComponent implements OnInit, OnDestroy {

  @HostBinding('class.privacy') someField: boolean = true;

  public user: firebase.User | null = null;
  private subscriptions: Subscription[] = [];


  constructor(private authService: AuthService) {
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
