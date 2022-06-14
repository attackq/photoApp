import {Component, Input, OnInit} from '@angular/core';
import {iconsSrc} from "../../../icons-path";
import {RoutesPath} from "../../../routes-path";
import {CrudService} from "../../../services/crud/crud.service";
import {Observable, of, switchMap} from "rxjs";
import {Post, PostStore, UserStore} from "../../../post";
import {Collections} from "../../../services/crud/collections";
import {map} from "rxjs/operators";
import {MatDialog} from "@angular/material/dialog";
import {ShareService} from "../../../services/share.service";
import {CheckLengthService} from "../../../services/check-length.service";

@Component({
  selector: 'app-likes-popup',
  templateUrl: './likes-popup.component.html',
  styleUrls: ['./likes-popup.component.css']
})
export class LikesPopupComponent implements OnInit {

  @Input()
  public postID: string;

  public icons = iconsSrc;
  public routes = RoutesPath;
  public usersLikes: Observable<UserStore[]>;

  constructor(private crudService: CrudService,
              private dialog: MatDialog,
              private checkLength: CheckLengthService) {
  }

  ngOnInit(): void {
    this.usersLikes = this.crudService.handleData<PostStore>(Collections.POSTS).pipe(
      map((posts: PostStore[]) => {
        return posts.filter((post: PostStore) => post.id === this.postID)
      }),
      switchMap((post: PostStore[]) => {
        return this.crudService.handleData<UserStore>(Collections.USERS).pipe(
          map((users: UserStore[]) => {
            return users.filter((user: UserStore) => {
              if (post[0].likes.includes(user.userID)) {
                return user;
              } else {
                return null;
              }
            })
          })
        )
      })
    )
  }

  public checkUsernameLength(nickname: string) {
    return this.checkLength.checkUsernameLength(nickname)
  }

  public closeDialogs() {
    this.dialog.closeAll();
  }
}
