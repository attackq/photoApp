import {Component, Input, OnInit} from '@angular/core';

export interface PopupLinks {
  name: string
}
@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {

  @Input() username = '';

  popuplinks: PopupLinks[] = [
    {name: 'Privacy'},
    {name: 'Terms'},
    {name: 'Log Out'},
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
