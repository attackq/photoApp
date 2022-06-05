import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {CrudService} from "../../../services/crud/crud.service";
import {UserStore} from "../../../post";
import {Collections} from "../../../services/crud/collections";
import {Observable, Subscription, tap} from "rxjs";
import {RoutesPath} from "../../../routes-path";
import {ActivatedRoute, Router} from "@angular/router";
import firebase from "firebase/compat";

@Component({
  selector: 'app-post-hover',
  templateUrl: './post-hover.component.html',
  styleUrls: ['./post-hover.component.css']
})
export class PostHoverComponent implements OnInit, OnDestroy {

  @Input()
  public postCreator: string;
  @Input()
  public postTitle: string = '';
  @Input()
  public postID: string;

  public paramId: string
  public routes = RoutesPath;
  public firePostCreator: Observable<UserStore[]>
  private subscriptions: Subscription[] = [];

  constructor(private crudService: CrudService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.route.params.subscribe(params => {
          this.paramId = params['id'];
        }
      )
    )
    this.firePostCreator = this.crudService.handleIdData<UserStore>(Collections.USERS, '==', this.postCreator)
  }

  public goToPostCreator(creatorId: string) {
    this.router.navigate([this.routes.account, creatorId])
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
