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
  public postLikes: string[];
  @Input()
  public postComments: [];
  @Input()
  public postID: string;

  constructor() {
  }

  ngOnInit(): void {
  }



}
