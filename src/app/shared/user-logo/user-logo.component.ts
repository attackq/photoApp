import {Component, Input, OnInit} from '@angular/core';
import firebase from "firebase/compat";
import {AuthService} from "../../services/auth/auth.service";
import {CrudService} from "../../services/crud/crud.service";
import {Collections} from "../../services/crud/collections";
import {PostStore, UserStore} from "../../post";
import {Observable} from "rxjs";

@Component({
  selector: 'app-user-logo',
  templateUrl: './user-logo.component.html',
  styleUrls: ['./user-logo.component.css']
})
export class UserLogoComponent implements OnInit {

  @Input()
  public size: string = '';

  public user: firebase.User | null = null;

  public fireUsers: Observable<UserStore[]>;

  public toggle: boolean = false;

  public photoUrl: string;

  constructor(private authService: AuthService,
              private crudService: CrudService) {
  }

  ngOnInit(): void {
    this.authService.user$.subscribe((value: firebase.User | null) => this.user = value);
    this.fireUsers = this.crudService.handleMailData<UserStore>(Collections.USERS, '==',this.user?.email!);
  }

  // getPhotoUrl() {
  //   return this.photoUrl = this.user?.photoURL!;
  // }
}
