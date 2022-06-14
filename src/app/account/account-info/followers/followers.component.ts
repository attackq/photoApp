import {Component, Input, OnInit} from '@angular/core';
import {iconsSrc} from "../../../icons-path";
import {CrudService} from "../../../services/crud/crud.service";
import {PostStore, UserStore} from "../../../post";
import {Collections} from "../../../services/crud/collections";
import {Observable, of, switchMap} from "rxjs";
import {map, tap} from "rxjs/operators";
import {RoutesPath} from "../../../routes-path";
import {CheckLengthService} from "../../../services/check-length.service";

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.css']
})
export class FollowersComponent implements OnInit {

  @Input()
  public userID: string;

  public icons = iconsSrc;
  public routes = RoutesPath;
  public followers$: Observable<UserStore[]>;

  constructor(private crudService: CrudService,
              private checkLength: CheckLengthService) {
  }

  ngOnInit(): void {
    this.followers$ = this.crudService.handleIdData<UserStore>(Collections.USERS, '==', this.userID).pipe(
      switchMap((user: UserStore[]) => {
        return this.crudService.handleData<UserStore>(Collections.USERS).pipe(
          map((us: UserStore[]) => {
            return us.filter((i: UserStore) => {
              if (user[0].followers.includes(i.userID)) {
                return i;
              } else {
                return null;
              }
            })
          })
        )
      })
    )
  }

  public trackFollowers(index: number, follower: UserStore) {
    return follower.id;
  }

  public checkUsername(name: string) {
    return this.checkLength.checkUsernameLength(name)
  }
}
