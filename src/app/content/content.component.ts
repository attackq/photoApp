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

  public trackByID(index: any, post: any) {
    console.log(index);
    return index;
  }

}


