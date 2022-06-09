import {Component, Input, OnInit} from '@angular/core';
import {RoutesPath} from "../../routes-path";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  @Input()
  public userAuthId: string

  public routes = RoutesPath;

  constructor() {
  }

  ngOnInit(): void {
  }


}
