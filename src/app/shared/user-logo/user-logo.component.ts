import {Component, Input, OnInit} from '@angular/core';
import firebase from "firebase/compat";
import {AuthService} from "../../services/auth/auth.service";

@Component({
  selector: 'app-user-logo',
  templateUrl: './user-logo.component.html',
  styleUrls: ['./user-logo.component.css']
})
export class UserLogoComponent implements OnInit {

  @Input()
  public size: string = '';

  public user: firebase.User | null = null;

  public toggle: boolean = false;

  public photoUrl: string;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.user$.subscribe((value: firebase.User | null) => this.user = value);
  }

  getPhotoUrl() {
    return this.photoUrl = this.user?.photoURL!;
  }
}
