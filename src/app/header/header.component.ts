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
import {filter, switchMap} from "rxjs";
import {tap} from "rxjs/operators";

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

  public userID = this.user?.uid!;

  // public user1: UserInfo = {
  //   name: 'Walter Cobalt',
  //   description: 'You can find pictures here!',
  //   followers: 10,
  //   following: 3,
  //   logo: 'assets/images/8.jpg'
  // }

  constructor(private authService: AuthService,
              private router: Router,
              private crudService: CrudService) {
  }

  ngAfterViewInit(): void {
    console.log(this.button);
  }

  ngOnInit(): void {
    this.authService.user$.subscribe((value: firebase.User | null) => this.user = value);
  }

  public toggle: boolean = false;

  public togglePopup(): void {
    this.toggle = !this.toggle;
  }

  public login(): void {
    this.authService.googleSingIn().subscribe(
      () => this.authService.user$.subscribe(() => this.router.navigate(["/account"])));
  }

}
