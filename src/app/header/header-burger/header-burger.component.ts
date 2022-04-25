import {AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-header-burger',
  templateUrl: './header-burger.component.html',
  styleUrls: ['./header-burger.component.css']
})
export class HeaderBurgerComponent implements OnInit, AfterViewInit {

  @ViewChild('burger') burger: ElementRef | undefined;

  @HostListener('document:mousedown', ['$event'])
  onGlobalClick(event: MouseEvent): void {
    if (!this.burger?.nativeElement.contains(event.target)) {
      this.isBurger = false;
    }
  }


  public isBurger: boolean = false;

  public toggleBurger(): void {
    this.isBurger = !this.isBurger;
  }


  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    console.log(this.burger);
  }

}
