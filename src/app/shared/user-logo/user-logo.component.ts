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
  public size: string;
  @Input()
  public userLogo: string | null;

  constructor() {
  }

  ngOnInit(): void {
  }

}
