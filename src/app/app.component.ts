import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AuthGuard} from './services/auth/auth.guard';
import {iconsSrc} from "./icons-path";
import firebase from "firebase/compat";
import {AuthService} from "./services/auth/auth.service";
import {RoutesPath} from "./routes-path";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [AuthGuard],
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {

  public user: firebase.User | null = null;

  public icons = iconsSrc;
  public routes = RoutesPath;

  public opened: boolean = false;

  constructor(private authService: AuthService) {
  }

  public ngOnInit(): void {
    this.authService.user$.subscribe((value: firebase.User | null) => this.user = value);
  }

  public title = 'photoApp';

}
