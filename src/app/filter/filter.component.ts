import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  linkname: string = 'All photos';
  chagneLinkname(newlink: string) {
    this.linkname = newlink;
  }


  toggle: boolean = false;
  togglePopup() {
    this.toggle = !this.toggle;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
