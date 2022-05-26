import { Component, OnInit } from '@angular/core';
import {iconsSrc} from "../icons-path";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  public icons = iconsSrc

  constructor() { }

  ngOnInit(): void {
  }

}
