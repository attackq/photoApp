import { Component, OnInit } from '@angular/core';

export interface Links {
  name: string;
  id: number;
}

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  links: Links[] = [
    {name: 'Home', id: 1},
    {name: 'Feed', id: 2},
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
