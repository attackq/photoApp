import {
  Component,
  ElementRef,
  HostListener, OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {iconsSrc} from "../icons-path";
import {AuthService} from '../services/auth/auth.service';
import {Router} from '@angular/router';
import firebase from "firebase/compat/app";
import {Collections} from "../services/crud/collections";
import {CrudService} from "../services/crud/crud.service";
import {Observable, Subscription, switchMap} from "rxjs";
import {UserStore} from "../post";
import {RoutesPath} from "../routes-path";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit, OnDestroy {

  @ViewChild('buttonElement') button: ElementRef | undefined;
  @ViewChild('smallSearch') smallSearch: ElementRef | undefined;

  @HostListener('document:mousedown', ['$event'])
  onGlobalClick(event: MouseEvent): void {
    if (!this.button?.nativeElement.contains(event.target)) {
      this.toggle = false;
    }
    if (!this.smallSearch?.nativeElement.contains(event.target)) {
      this.condition = false;
    }
  }

  public condition: boolean = false;
  public user: firebase.User | null = null;
  public routes = RoutesPath;
  public icons = iconsSrc;
  public fireUsers: Observable<UserStore[]>;
  public toggle: boolean = false;
  private subscriptions: Subscription[] = [];

  constructor(private authService: AuthService,
              private router: Router,
              private crudService: CrudService) {
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.authService.user$.subscribe((value: firebase.User | null) => this.user = value)
    );
    this.fireUsers = this.authService.user$.pipe(
      switchMap((value: firebase.User | null) => {
        return this.crudService.handleMailData<UserStore>(Collections.USERS, '==', value?.email!)
      })
    );
  }

  public togglePopup(): void {
    this.toggle = !this.toggle;
  }

  public login(): void {
    this.subscriptions.push(
      this.authService.googleSingIn().pipe(
        switchMap(() => this.authService.user$))
        .subscribe(() => this.router.navigate([this.routes.account, this.user?.uid!]))
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
