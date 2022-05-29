import { Component, OnInit } from '@angular/core';
import {iconsSrc} from "../icons-path";
import {RouteLinks, RoutesPath} from "../routes-path";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  public icons = iconsSrc;
  public routes = RoutesPath;
  public routeLinks = RouteLinks;

  constructor() { }

  ngOnInit(): void {
  }

}
