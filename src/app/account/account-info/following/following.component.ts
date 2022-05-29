import {Component, Input, OnInit} from '@angular/core';
import {iconsSrc} from "../../../icons-path";
import {Observable, switchMap} from "rxjs";
import {UserStore} from "../../../post";
import {Collections} from "../../../services/crud/collections";
import {map} from "rxjs/operators";
import {CrudService} from "../../../services/crud/crud.service";

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.css']
})
export class FollowingComponent implements OnInit {

  @Input()
  public userID: string;

  public icons = iconsSrc;

  public following: Observable<UserStore[]>;

  constructor(private crudService: CrudService) { }

  ngOnInit(): void {
    this.following = this.crudService.handleIdData<UserStore>(Collections.USERS, '==', this.userID).pipe(
      switchMap((user: UserStore[]) => {
        return this.crudService.handleData<UserStore>(Collections.USERS).pipe(
          map((us: UserStore[]) => {
            return us.filter((i: UserStore) => {
              if (user[0].following.includes(i.userID)) {
                return i
              } else {
                return null
              }
            })
          })
        )
      })
    )
  }

}
