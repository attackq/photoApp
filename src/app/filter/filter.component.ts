import {
  Component,
  Input,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import firebase from "firebase/compat";
import {AuthService} from "../services/auth/auth.service";
import {Router} from "@angular/router";


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

  public defaultLink: string = 'standart';

  public filterLinks: FilterLinks[] = [
    {name: 'standart', viewValue: 'All photos'},
    {name: 'SSSRecent', viewValue: 'Recent'},
    {name: 'Most liked', viewValue: 'Most liked'},
    {name: 'Most commented', viewValue: 'Most commented'}
  ]

  constructor(private authService: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.authService.user$.subscribe((value: firebase.User | null) => this.user = value);
  }

  public getDefaultValue() {
    this.defaultLink = 'standart';
  }

  public logValue(value: string) {
    console.log(value)
    if (value === 'All photos') {
      this.router.navigate(['/account/', this.user?.uid!])
    }
  }
}

