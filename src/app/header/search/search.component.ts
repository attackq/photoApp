import {Component, ElementRef, HostListener, Input, OnInit, ViewChild, ViewEncapsulation} from "@angular/core";
import {CrudService} from "../../services/crud/crud.service";
import {BehaviorSubject, debounceTime, filter, Observable, of, ReplaySubject, Subject, switchMap} from "rxjs";
import {UserStore} from "../../post";
import {Collections} from "../../services/crud/collections";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class SearchComponent implements OnInit {

  @Input()
  public imagePath: string = '';
  @Input()
  public size: string = '';

  @ViewChild('searchElement') button: ElementRef | undefined;
  @ViewChild('searchInput') input: ElementRef;

  @HostListener('document:mousedown', ['$event'])
  onGlobalClick(event: MouseEvent): void {
    if (!this.button?.nativeElement.contains(event.target)) {
      this.isResults = false;
      this.input.nativeElement.value = '';
    }
  }

  private readonly MAX_SEARCH_SYMBOLS: number = 1;

  public isResults: boolean = false;

  public fireUsers: Observable<UserStore[]>;

  public name: Subject<string> = new Subject<string>();

  constructor(private crudService: CrudService) { }

  ngOnInit(): void {
    this.fireUsers = this.name.pipe(
      filter(value =>  value.length > this.MAX_SEARCH_SYMBOLS),
      switchMap((value: string) => {
        return this.crudService.handleData<UserStore>(Collections.USERS).pipe(
          map((users: UserStore[]) => {
            return users.filter((i: UserStore) => {
              return i.name?.trim().toLowerCase().includes(value);
            })
          }),
          debounceTime(500)
        )
      })
    )
  }

  public showResult(event: any) {
    this.isResults = event.target.value !== '';
    this.name.next(event.target.value.trim().toLowerCase());
  }

}
