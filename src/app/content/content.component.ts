import {Component, OnInit} from '@angular/core';
import {Post} from "../post";

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  public post1: Post = {
    photo: 'assets/images/user-back.jpg',
    title: 'F1 crush',
    description: 'Look at this!',
    likes: 13,
    comments: 2
  }

  constructor() {
  }

  ngOnInit(): void {
  }

}
