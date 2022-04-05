import {Component, Input, OnInit} from '@angular/core';
import {Post} from "../../post";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input()
  public postImg: string = '';
  @Input()
  public postTitle: string = '';
  @Input()
  public postLikes: number = 0;
  @Input()
  public postComments: number = 0;

  public hover:boolean = false;

  public hoverPopup(): void {
    this.hover = !this.hover;
  }

  public posts: Post[] = [
    {
      photo: 'assets/images/user-back.jpg',
      title: 'F1 crush',
      description: 'Look at this!',
      likes: 13,
      comments: 2
    },
    {
      photo: 'assets/images/user-back.jpg',
      title: 'F133333 crush',
      description: 'Look at this!',
      likes: 13,
      comments: 2
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
