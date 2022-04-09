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
  public login: boolean = false;
  title = 'photoApp';
}
