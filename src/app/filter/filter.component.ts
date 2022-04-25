import {Component, ElementRef, HostListener, Input, OnInit, ViewChild} from '@angular/core';
import {iconsSrc} from "../icons-path";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  // @ViewChild('filterLink') filterLink: ElementRef | undefined;
  // @ViewChild('filterPopup') filterPopup: ElementRef | undefined;
  //
  // @HostListener('document:mousedown', ['$event'])
  // onGlobalClick(event: MouseEvent): void {
  //   if (!this.filterLink?.nativeElement.contains(event.target)) {
  //     this.toggle = false;
  //   }
  // }

  public icons = iconsSrc;

  public linkName: string = 'All photos';

  public changeName(newLink: string) {
    this.linkName = newLink;
  }

  toggle: boolean = false;
  togglePopup() {
    this.toggle = !this.toggle;
  }

  constructor() { }

  ngOnInit(): void {
  }

}

