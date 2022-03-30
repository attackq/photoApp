import { Component } from '@angular/core';

export interface Users {
  name: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  users: Users[] = [
    {name: 'Walter Cobalt'}
  ]

  hover:boolean = false;

  hoverPopup() {
    this.hover = !this.hover;
  }
  title = 'photoApp';
}
