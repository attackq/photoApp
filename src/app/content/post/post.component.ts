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
import {Observable, of, Subject, Subscription} from "rxjs";
import {RoutesPath} from "../../routes-path";
import {ShareService} from "../../services/share.service";

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
  public userIdFromParams: string | null;
  @Input()
  public userIdFromAuth: string = '';
  @Input()
  public paramsId: string = '';

  public routes = RoutesPath;
  public isOpenedDialog: boolean;
  public sharingId: string;
  public afterCloseSub: Subscription;
  private subscriptions: Subscription[] = [];

  constructor(private crudService: CrudService,
              private uploadService: UploadService,
              private dialog: MatDialog,
              private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private share: ShareService) {
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.route.queryParams
        .subscribe(params => {
            if (params['postId'] === this.postID && !this.isOpenedDialog) {
              this.openExtendedPostDialog();
            }
          }
        ),
      this.share.customerLink.subscribe(
        (customerId: string) => {
          this.afterCloseSub.unsubscribe();
          this.router.navigate([this.routes.account, customerId]);
        }
      )
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

    this.afterCloseSub = extendedPost.afterClosed().subscribe(() => {
      this.router.navigate([], {
        queryParams: {
          postId: null
        },
        queryParamsHandling: "merge",
      });
    })
  }

  public deletePost(id: string): void {
    this.crudService.deleteObject(Collections.POSTS, id).subscribe();
    this.uploadService.deleteFile(this.postImg!);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    if (this.afterCloseSub) {
      this.afterCloseSub.unsubscribe();
    }
  }

}
