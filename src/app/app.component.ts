import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AuthService} from "./services/auth/auth.service";
import firebase from "firebase/compat/app";
import { AuthGuard } from './services/auth/auth.guard';

export interface Users {
  name: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [AuthGuard],
  styleUrls: ['./app.component.css'],
  encapsulation:  ViewEncapsulation.None
})
export class AppComponent implements OnInit {

  public user: firebase.User | null = null;

  constructor(private authService: AuthService) {
  }

  public ngOnInit(): void {
    this.authService.user$.subscribe((value: firebase.User | null) => this.user = value);
  }
  title = 'photoApp';

}
