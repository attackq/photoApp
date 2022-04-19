import {Component, OnInit} from '@angular/core';
import {Post} from "../post";

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  public posts: Post[] = [
    {
      photo: 'assets/images/graffiti.jpg',
      title: 'F1 crush',
      description: 'Look at this!',
      likes: 13,
      comments: 2
    },
    {
      photo: 'assets/images/bmw_e30.jpg',
      title: 'BMW E30',
      description: 'Look at this!',
      likes: 4,
      comments: 5
    },
    {
      photo: 'assets/images/kosmos.jpg',
      title: 'Space',
      description: 'Look at this!',
      likes: 24,
      comments: 4
    },
    {
      photo: 'assets/images/closed.jpg',
      title: 'Closed',
      description: 'Look at this!',
      likes: 44,
      comments: 1
    },
    {
      photo: 'assets/images/lambo.jpg',
      title: 'Lambo',
      description: 'Look at this!',
      likes: 44,
      comments: 1
    },
    {
      photo: 'assets/images/spaceman.jpg',
      title: 'CosmoApple',
      description: 'Look at this!',
      likes: 44,
      comments: 1
    }

  ]

  constructor() {
  }

  ngOnInit(): void {
  }

}
