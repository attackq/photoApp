import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-user-logo',
  templateUrl: './user-logo.component.html',
  styleUrls: ['./user-logo.component.css']
})
export class UserLogoComponent implements OnInit {
  @Input() username = '';
  @Input() size = '';

  constructor() { }

  ngOnInit(): void {
  }

}
