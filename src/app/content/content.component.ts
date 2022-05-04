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

  public firePosts: Observable<PostStore[]> = this.crudService.handlePostsData<PostStore>(Collections.POSTS, 'sortID');

  constructor(private crudService: CrudService) {
  }

  ngOnInit(): void {
  }

  public trackByID(index: number, post: PostStore) {
    return post.sortID;
  }

}


