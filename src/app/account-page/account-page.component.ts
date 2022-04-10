import {Component, HostBinding, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.css'],
  encapsulation:  ViewEncapsulation.None

})
export class AccountPageComponent implements OnInit {

  constructor() { }

  @HostBinding('class.account__page') someField: boolean = true;

  ngOnInit(): void {
  }

}
