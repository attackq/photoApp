import {Component, Input, OnInit} from '@angular/core';

export interface Users {
  name: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  users: Users[] = [
    {name: 'Walter Cobalt'},
  ]

  constructor() { }

  ngOnInit(): void {
  }
  toggle: boolean = false;
  togglePopup() {
    this.toggle = !this.toggle;
  }

}
