import {Component, OnInit} from '@angular/core';
import {Post, PostStore} from "../post";
import {Observable} from "rxjs";
import {CrudService} from "../services/crud/crud.service";
import {Collections} from "../services/crud/collections";
import firebase from "firebase/compat";
import DocumentReference = firebase.firestore.DocumentReference;

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  public firePosts: Observable<PostStore[]> = this.crudService.handleData<PostStore>(Collections.POSTS)

  public addUser(): void {
    const post: Post = {
      photo: 'car',
      title: 'Builders',
      description: 'There are two builders',
      likes: 10,
      comments: 1
    }
    this.crudService.createObject(Collections.POSTS, post).subscribe((value: DocumentReference<Post>) => console.log(value));
  }

  public getInfo(id: string): void {
    this.crudService.getUserDoc<Post>(Collections.POSTS, id).subscribe((value: Post | undefined) => console.log(value));
  }

  public delete(id: string): void {
    this.crudService.deleteObject(Collections.POSTS, id).subscribe();
  }

  public update(id: string): void {
    const newPost: Post = {
      photo: 'house',
      title: 'Something',
      description: 'There is something',
      likes: 30,
      comments: 2
    }
    this.crudService.updateObject(Collections.POSTS, id, newPost).subscribe();
  }

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

  constructor(private crudService: CrudService) {
  }

  ngOnInit(): void {
  }

}
