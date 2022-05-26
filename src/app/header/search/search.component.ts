import {Component, ElementRef, HostListener, Input, OnInit, ViewChild, ViewEncapsulation} from "@angular/core";
import {CrudService} from "../../services/crud/crud.service";
import {BehaviorSubject, filter, Observable, of, ReplaySubject, switchMap} from "rxjs";
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

  public isResults: boolean = false;

  public fireUsers: Observable<UserStore[]>;

  public name: ReplaySubject<string> = new ReplaySubject<string>(0);

  constructor(private crudService: CrudService) { }

  ngOnInit(): void {
    this.fireUsers = this.name.pipe(
      filter(value =>  value.length > 2),
      switchMap((value: string) => {
        return this.crudService.handleData<UserStore>(Collections.USERS).pipe(
          map((users: UserStore[]) => {
            return users.filter((i: UserStore) => {
              return i.name.trim().toLowerCase().includes(value);
            })
          })
        )
      })
    )

    // this.fireUsers = this.name.pipe(
    //   switchMap((value: string) => {
    //     console.log(value)
    //     return this.crudService.handleUserNameData<UserStore>(Collections.USERS, value)
    //   })
    // )
    // this.fireUsers.subscribe((value) => console.log(value));
  }

  public showResult(event: any) {
    this.isResults = event.target.value !== '';
    this.name.next(event.target.value.trim().toLowerCase());
  }

}
