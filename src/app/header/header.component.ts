import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {iconsSrc} from "../icons-path";
import {UserInfo} from "../user-info";
import {AuthService} from '../services/auth/auth.service';
import {Router} from '@angular/router';
import firebase from "firebase/compat/app";
import {Collections} from "../services/crud/collections";
import {DocumentReference} from "@angular/fire/compat/firestore";
import {CrudService} from "../services/crud/crud.service";
import {filter, Observable, switchMap} from "rxjs";
import {tap} from "rxjs/operators";
import {UserStore} from "../post";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit, AfterViewInit {

  @ViewChild('buttonElement') button: ElementRef | undefined;

  @HostListener('document:mousedown', ['$event'])
  onGlobalClick(event: MouseEvent): void {
    if (!this.button?.nativeElement.contains(event.target)) {
      this.toggle = false;
    }
  }

  public condition: boolean = false;

  public user: firebase.User | null = null;

  public icons = iconsSrc;
  public fireUsers: Observable<UserStore[]>;


  constructor(private authService: AuthService,
              private router: Router,
              private crudService: CrudService) {
  }

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    this.authService.user$.subscribe((value: firebase.User | null) => this.user = value);
    this.fireUsers = this.authService.user$.pipe(
      switchMap((value: firebase.User | null) => {
        return this.crudService.handleMailData<UserStore>(Collections.USERS, '==', value?.email!)
      })
    )
  }

  public toggle: boolean = false;

  public togglePopup(): void {
    this.toggle = !this.toggle;
  }

  // public login(): void {
  //   this.authService.googleSingIn().subscribe(
  //     () => this.authService.user$.subscribe(() => this.router.navigate(["/account"])));
  // }

  public login(): void {
    this.authService.googleSingIn().pipe(
      switchMap(() => this.authService.user$)
    ).subscribe(() => this.router.navigate(['/account/', this.user?.uid!]))
  }
}
