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
export class PostHoverComponent implements OnInit {

  @Input()
  public postCreator: string;
  @Input()
  public postTitle: string = '';
  @Input()
  public postID: string;
  @Input()
  public paramId: string;

  public routes = RoutesPath;
  public firePostCreator: Observable<UserStore[]>

  constructor(private crudService: CrudService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.firePostCreator = this.crudService.handleIdData<UserStore>(Collections.USERS, '==', this.postCreator)
  }

  public goToPostCreator(creatorId: string) {
    this.router.navigate([this.routes.account, creatorId])
  }

}
