import { Component, OnInit } from '@angular/core';
import {iconsSrc} from "../icons-path";

export interface Links {
  name: string;
}

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  public links: Links[] = [
    {name: 'About'},
    {name: 'Terms'},
    {name: 'Privacy'},
  ]

  public icons = iconsSrc;

  constructor() { }

  ngOnInit(): void {
  }

}
