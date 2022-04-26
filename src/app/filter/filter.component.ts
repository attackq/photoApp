import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {iconsSrc} from "../icons-path";
import {MatSelect} from "@angular/material/select";


export interface FilterLinks {
  name: string;
  viewValue:string;
}

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class FilterComponent implements OnInit {

  @ViewChild('mySelect') private select: MatSelect;

  // @ViewChild('filterLink') filterLink: ElementRef | undefined;
  // @ViewChild('filterPopup') filterPopup: ElementRef | undefined;
  //
  // @HostListener('document:mousedown', ['$event'])
  // onGlobalClick(event: MouseEvent): void {
  //   if (!this.filterLink?.nativeElement.contains(event.target)) {
  //     this.toggle = false;
  //   }
  // }

  public selected: string = 'All photos';

  public filterLinks: FilterLinks[] = [
    {name: 'All photos', viewValue: 'All photos'},
    {name: 'Recent', viewValue: 'Recent'},
    {name: 'Most liked', viewValue: 'Most liked'},
    {name: 'Most commented', viewValue: 'Most commented'}
  ]

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

