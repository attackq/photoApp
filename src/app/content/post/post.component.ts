import {Component, Input, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Collections} from "../../services/crud/collections";
import {CrudService} from "../../services/crud/crud.service";
import {UploadService} from "../../services/crud/upload.service";
import {MatDialog} from "@angular/material/dialog";
import {EditPopupComponent} from "./edit-popup/edit-popup.component";
import {PostExtendedComponent} from "./post-extended/post-extended.component";
import {AuthService} from "../../services/auth/auth.service";
import firebase from "firebase/compat";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PostComponent implements OnInit, OnDestroy {

  @Input()
  public postImg: string | null = '';
  @Input()
  public postTitle: string = '';
  @Input()
  public postID: string = '';
  @Input()
  public postDesc: string = '';
  @Input()
  public postDate: number;

  @Input()
  public postCreator: string;
  @Input()
  public userID: string | null;
  public isOpenedDialog: boolean;
  public user: firebase.User | null = null;
  public queryPostId: string
  public sharingId: string;
  private subscriptions: Subscription[] = [];


  public delete(id: string): void {
    this.crudService.deleteObject(Collections.POSTS, id).subscribe();
    this.uploadService.deleteFile(this.postImg!);
  }

  constructor(private crudService: CrudService,
              private uploadService: UploadService,
              private dialog: MatDialog,
              private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.route.queryParams
        .subscribe(params => {
            this.queryPostId = params['postId'];
            if (params['postId'] === this.postID && !this.isOpenedDialog) {
              this.openExtendedPostDialog();
            }
          }
        ),
      this.authService.user$.subscribe((value: firebase.User | null) => this.user = value)
    )
  }

  public openEditPopupDialog(id: string) {
    let editPopup = this.dialog.open(EditPopupComponent);
    editPopup.componentInstance.postID = id;
    editPopup.componentInstance.postDesc = this.postDesc;
    editPopup.componentInstance.postTitle = this.postTitle;
  }

  public openExtendedPostDialog() {
    let extendedPost = this.dialog.open(PostExtendedComponent);
    this.isOpenedDialog = true;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        postId: this.postID
      },
      queryParamsHandling: "merge",
    })
    this.sharingId = window.location.host + '/account/' + this.postCreator + '?postId=' + this.postID;
    extendedPost.componentInstance.sharePostId = this.sharingId;
    extendedPost.componentInstance.postImg = this.postImg;
    extendedPost.componentInstance.postDesc = this.postDesc;
    extendedPost.componentInstance.postDate = this.postDate;
    extendedPost.componentInstance.postID = this.postID;
    extendedPost.componentInstance.postCreator = this.postCreator;

    this.subscriptions.push(
      extendedPost.afterClosed().subscribe(() => {
        this.router.navigate([]);
      })
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
