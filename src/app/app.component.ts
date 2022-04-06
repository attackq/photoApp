import { Component } from '@angular/core';
import { UserInfo } from "./user-info";

export interface Users {
  name: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  // public users: Users[] = [
  //   {name: 'Walter Cobalt'}
  // ]

  public user1: UserInfo = {
    name: 'Walter Cobalt',
    description: 'You can find pictures here!',
    followers: 10,
    following: 3,
    logo: "assets/images/8.jpg"
  }

  title = 'photoApp';

}
