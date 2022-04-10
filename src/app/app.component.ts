import {Component, ViewEncapsulation} from '@angular/core';

export interface Users {
  name: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation:  ViewEncapsulation.None
})
export class AppComponent {
  title = 'photoApp';
}
