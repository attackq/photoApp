import {Component, Input, OnInit} from '@angular/core';
import {UserInfo} from "../user-info";
import firebase from "firebase/compat/app";
import {AuthService} from '../services/auth/auth.service';
import {MatDialog} from '@angular/material/dialog';
import {AccountPopupComponent} from "../account-popup/account-popup.component";
import {Observable} from "rxjs";
import {Post, PostStore} from "../post";
import {Collections} from "../services/crud/collections";
import {CrudService} from "../services/crud/crud.service";
import DocumentReference = firebase.firestore.DocumentReference;

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  // public addPost(): void {
  //   const post: Post = {
  //     photo: 'https://natureconservancy-h.assetsadobe.com/is/image/content/dam/tnc/nature/en/photos/Zugpsitze_mountain.jpg?crop=0,176,3008,1654&wid=4000&hei=2200&scl=0.752',
  //     title: 'Builders',
  //     description: 'There are two builders',
  //     likes: 10,
  //     comments: 1
  //   }
  //   this.crudService.createObject(Collections.POSTS, post).subscribe((value: DocumentReference<Post>) => console.log(value));
  // }

  public user: firebase.User | null = null;

  public backgroundPath: string = 'assets/images/Mainbg.jpg';

  public user1: UserInfo = {
    name: 'Walter Cobalt',
    description: 'You can find pictures here!',
    followers: 10,
    following: 3,
    logo: "assets/images/8.jpg"
  }

  public user$: Observable<firebase.User | null> = this.authService.user$;

  constructor(private authService: AuthService,
              public dialog: MatDialog,
              public crudService: CrudService) {
  }

  ngOnInit(): void {
    this.authService.user$.subscribe((value: firebase.User | null) => this.user = value);
  }

  openDialog() {
    this.dialog.open(AccountPopupComponent);
  }
}


