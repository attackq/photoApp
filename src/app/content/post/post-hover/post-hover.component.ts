import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-post-hover',
  templateUrl: './post-hover.component.html',
  styleUrls: ['./post-hover.component.css']
})
export class PostHoverComponent implements OnInit {



  @Input()
  public postTitle: string = '';
  @Input()
  public postID: string;

  constructor() {
  }

  ngOnInit(): void {
  }



}
