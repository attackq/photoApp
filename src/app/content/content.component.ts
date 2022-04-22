import {Component, OnInit} from '@angular/core';
import {PostStore} from "../post";
import {Observable} from "rxjs";
import {CrudService} from "../services/crud/crud.service";
import {Collections} from "../services/crud/collections";

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  public firePosts: Observable<PostStore[]> = this.crudService.handleData<PostStore>(Collections.POSTS);

  constructor(private crudService: CrudService) {
  }

  ngOnInit(): void {
  }

}


// public addUser(): void {
//   const post: Post = {
//   photo: 'https://natureconservancy-h.assetsadobe.com/is/image/content/dam/tnc/nature/en/photos/Zugpsitze_mountain.jpg?crop=0,176,3008,1654&wid=4000&hei=2200&scl=0.752',
//   title: 'Builders',
//   description: 'There are two builders',
//   likes: 10,
//   comments: 1
// }
// this.crudService.createObject(Collections.POSTS, post).subscribe((value: DocumentReference<Post>) => console.log(value));
// }
//
// public getInfo(id: string): void {
//   this.crudService.getUserDoc<Post>(Collections.POSTS, id).subscribe((value: Post | undefined) => console.log(value));
// }
//
// public delete(id: string): void {
//   this.crudService.deleteObject(Collections.POSTS, id).subscribe();
// }
//
// public update(id: string): void {
//   const newPost: Post = {
//   photo: 'https://ps.w.org/tiny-compress-images/assets/icon-256x256.png?rev=1088385',
//   title: 'Something',
//   description: 'There is something',
//   likes: 30,
//   comments: 2
// }
// this.crudService.updateObject(Collections.POSTS, id, newPost).subscribe();
// }
