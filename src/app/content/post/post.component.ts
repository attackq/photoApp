import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {Collections} from "../../services/crud/collections";
import {CrudService} from "../../services/crud/crud.service";
import {UploadService} from "../../services/crud/upload.service";
import {MatDialog} from "@angular/material/dialog";
import {EditPopupComponent} from "./edit-popup/edit-popup.component";
import {PostExtendedComponent} from "./post-extended/post-extended.component";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PostComponent implements OnInit {

  @Input()
  public postImg: string | null = '';
  @Input()
  public postTitle: string = '';
  @Input()
  public postLikes: string[];
  @Input()
  public postComments: [];
  @Input()
  public postID: string = '';
  @Input()
  public postDesc: string = '';
  @Input()
  public postDate: number;


  public delete(id: string): void {
    this.crudService.deleteObject(Collections.POSTS, id).subscribe();
    this.uploadService.deleteFile(this.postImg!);
  }

  constructor(private crudService: CrudService,
              private uploadService: UploadService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  public openEditPopupDialog(id: string) {
    let editPopup = this.dialog.open(EditPopupComponent);
    editPopup.componentInstance.postID = id;
  }

  public openExtendedPostDialog(img: string | null, desc: string, date: number) {
    let extendedPost = this.dialog.open(PostExtendedComponent);
    extendedPost.componentInstance.postImg = img;
    extendedPost.componentInstance.postDesc = desc;
    extendedPost.componentInstance.postDate = date;
  }

}
