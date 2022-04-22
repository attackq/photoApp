import {Component, Input, OnInit} from '@angular/core';
import {Post} from "../../post";
import {Collections} from "../../services/crud/collections";
import {CrudService} from "../../services/crud/crud.service";

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
  @Input()
  public postID: string = '';
  @Input()
  public postDesc: string = '';

  public hover:boolean = false;

  public hoverPopup(): void {
    this.hover = !this.hover;
  }

  public delete(id: string): void {
    this.crudService.deleteObject(Collections.POSTS, id).subscribe();
  }

  public update(id: string): void {
    const newPost: Post = {
      photo: 'https://ps.w.org/tiny-compress-images/assets/icon-256x256.png?rev=1088385',
      title: 'Something',
      description: 'There is something',
      likes: 30,
      comments: 2
    }
    this.crudService.updateObject(Collections.POSTS, id, newPost).subscribe();
  }

  constructor(private crudService: CrudService) { }

  ngOnInit(): void {
  }

}
