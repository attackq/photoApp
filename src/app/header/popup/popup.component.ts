import {Component, Input, OnInit} from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

export interface PopupLinks {
  name: string
}
@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {

  @Input()
  public username: string = '';

  public popuplinks: PopupLinks[] = [
    {name: 'Privacy'},
    {name: 'Terms'},
  ]
  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
  }

  public logout(): void {
    this.authService.signOut().subscribe(() => this.router.navigate(["/login"]));
  }

}
