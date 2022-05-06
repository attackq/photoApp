import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {Observable} from "rxjs";
import {UserStore} from "../../../post";
import {Collections} from "../../../services/crud/collections";
import {CrudService} from "../../../services/crud/crud.service";
import firebase from "firebase/compat";
import {AuthService} from "../../../services/auth/auth.service";

@Component({
  selector: 'app-post-extended',
  templateUrl: './post-extended.component.html',
  styleUrls: ['./post-extended.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class PostExtendedComponent implements OnInit {

  @Input()
  public postImg: string | null = '';
  @Input()
  public postDesc: string = '';
  @Input()
  public postDate: number;
  @Input()
  public postLikes: string[];
  @Input()
  public postComments: [];
  @Input()
  public postID: string;

  public user: firebase.User | null = null;

  public fireUsers: Observable<UserStore[]>;

  constructor(private crudService: CrudService,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.user$.subscribe((value: firebase.User | null) => this.user = value);
    this.fireUsers = this.crudService.handleMailData<UserStore>(Collections.USERS, '==' ,this.user?.email!);
  }

}
