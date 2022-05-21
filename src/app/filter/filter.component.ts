import {
  Component,
  Input,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import firebase from "firebase/compat";
import {AuthService} from "../services/auth/auth.service";
import {Router} from "@angular/router";
import {FilterService} from "../services/filter.service";


export interface FilterLinks {
  name: string;
  viewValue: string;
}

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class FilterComponent implements OnInit {

  @Input()
  public userID: string;

  public user: firebase.User | null = null;

  public defaultLink: string = 'Filter';

  public filterLinks: FilterLinks[] = [
    {name: 'Filter', viewValue: 'Filter'},
    {name: 'All photos', viewValue: 'All photos'},
    {name: 'Most liked', viewValue: 'Most liked'},
    {name: 'Most commented', viewValue: 'Most commented'}
  ]

  constructor(private authService: AuthService,
              private router: Router,
              public filterService: FilterService) {
  }

  ngOnInit(): void {
    this.authService.user$.subscribe((value: firebase.User | null) => this.user = value);
  }

  public getDefaultValue() {
    this.defaultLink = 'Filter';
  }

  public setChangedValue(value: string) {
    this.filterService.changedValue = value;
    this.router.navigate(['/account/', this.userID]);
  }
}

