import {Component, Input, OnInit} from '@angular/core';
import {iconsSrc} from "../../icons-path";

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.css']
})
export class AccountInfoComponent implements OnInit {

  @Input()
  public username: string = '';
  @Input()
  public followers: number = 0;
  @Input()
  public following: number = 0;
  @Input()
  public description: string = '';


  icons = iconsSrc;

  constructor() { }

  ngOnInit(): void {
  }

}
