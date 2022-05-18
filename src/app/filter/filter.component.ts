import {
  Component,
  Input,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import firebase from "firebase/compat";
import {AuthService} from "../services/auth/auth.service";


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

  public defaultLink: string = 'All photos';

  public filterLinks: FilterLinks[] = [
    {name: 'All photos', viewValue: 'All photos'},
    {name: 'Recent', viewValue: 'Recent'},
    {name: 'Most liked', viewValue: 'Most liked'},
    {name: 'Most commented', viewValue: 'Most commented'}
  ]

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.user$.subscribe((value: firebase.User | null) => this.user = value);
  }

}

