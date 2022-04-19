import {Component, Input, OnInit} from '@angular/core';
import {iconsSrc} from "../../../icons-path";

@Component({
  selector: 'app-post-hover',
  templateUrl: './post-hover.component.html',
  styleUrls: ['./post-hover.component.css']
})
export class PostHoverComponent implements OnInit {

  @Input()
  public postTitle: string = '';
  @Input()
  public postLikes: number = 0;
  @Input()
  public postComments: number = 0;

  public addColor: boolean = false;

  public clickEvent(): void {
    this.addColor = !this.addColor;
    if (this.addColor) {
      this.postLikes = this.postLikes + 1;
    } else {
      this.postLikes = this.postLikes - 1;
    }

  }
  public icons = iconsSrc;

  constructor() { }

  ngOnInit(): void {
  }

}
