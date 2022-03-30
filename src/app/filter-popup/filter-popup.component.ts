import { Component, OnInit, Output, EventEmitter } from '@angular/core';

export interface FilterLinks {
  name: string;
}

@Component({
  selector: 'app-filter-popup',
  templateUrl: './filter-popup.component.html',
  styleUrls: ['./filter-popup.component.css']
})
export class FilterPopupComponent implements OnInit {

  @Output() newItemEvent = new EventEmitter<string>();

  filterLinks: FilterLinks[] = [
    {name: 'All photos'},
    {name: 'Recent'},
    {name: 'Most liked'},
    {name: 'Most commented'}
  ]

  constructor() { }

  ngOnInit(): void {
  }

  addNewItem(value: string) {
    this.newItemEvent.emit(value);
  }


}
