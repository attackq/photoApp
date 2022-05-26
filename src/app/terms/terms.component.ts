import {Component, HostBinding, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class TermsComponent implements OnInit {

  @HostBinding('class.terms') someField: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

}
