import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {
  @Input()
  public label: string;
  @Input()
  public bgColor: string;
  @Input()
  public condition: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
