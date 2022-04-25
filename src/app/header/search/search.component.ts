import {Component, Input, OnInit} from "@angular/core";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @Input()
  public imagePath: string = '';

  @Input()
  public size: string = '';

  constructor() { }

  ngOnInit(): void {
  }
}
