import {Component, HostBinding, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import firebase from "firebase/compat";
import {AuthService} from "../services/auth/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class TermsComponent implements OnInit, OnDestroy {

  @HostBinding('class.terms') someField: boolean = true;

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
