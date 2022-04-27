import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {Post, PostStore} from "../../post";
import {Collections} from "../../services/crud/collections";
import {CrudService} from "../../services/crud/crud.service";
import {UploadService} from "../../services/crud/upload.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PostComponent implements OnInit {

  public firePosts: Observable<PostStore[]> = this.crudService.handleData<PostStore>(Collections.POSTS);

  @Input()
  public postImg: string | null = '';
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

  public delete(id: string): void {
    this.crudService.deleteObject(Collections.POSTS, id).subscribe();
    this.uploadService.deleteFile(this.postImg!);
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

  constructor(private crudService: CrudService,
              private uploadService: UploadService) {
  }

  ngOnInit(): void {
  }

}
