import {Component, Input, OnInit} from '@angular/core';
import {RoutesPath} from "../../routes-path";
import {AuthService} from "../../services/auth/auth.service";
import firebase from "firebase/compat";
import {tap} from "rxjs/operators";
import {Router} from "@angular/router";

@Component({
  selector: 'app-head-logo',
  templateUrl: './head-logo.component.html',
  styleUrls: ['./head-logo.component.css']
})
export class HeadLogoComponent implements OnInit {

  @Input()
  public imagePath: string;

  public routes = RoutesPath;

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
  }

  public checkUserAuthAndRedirect() {
    this.authService.user$.pipe(
      tap((user: firebase.User | null) => {
        if (user) {
          this.router.navigate([this.routes.feed])
          return
        }
        this.router.navigate([this.routes.login])
      })
    ).subscribe()
  }

}
