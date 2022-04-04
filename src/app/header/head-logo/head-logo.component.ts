import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-head-logo',
  templateUrl: './head-logo.component.html',
  styleUrls: ['./head-logo.component.css']
})
export class HeadLogoComponent implements OnInit {

  @Input()
  public imagePath: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
