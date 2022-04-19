import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AuthGuard} from './services/auth/auth.guard';

export interface Users {
  name: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [AuthGuard],
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {

  constructor() {
  }

  public ngOnInit(): void {
  }

  title = 'photoApp';

}
