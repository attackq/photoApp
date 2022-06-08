import {Component, ElementRef, HostListener, Input, OnInit, ViewChild, ViewEncapsulation} from "@angular/core";
import {CrudService} from "../../services/crud/crud.service";
import {BehaviorSubject, debounceTime, filter, Observable, of, ReplaySubject, Subject, switchMap} from "rxjs";
import {UserStore} from "../../post";
import {Collections} from "../../services/crud/collections";
import {map} from "rxjs/operators";
import {RoutesPath} from "../../routes-path";
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {FormControls} from "../../controls";
import {NotifierService} from "angular-notifier";

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

  public searchForm: FormGroup = new FormGroup({});
  public formControls: typeof FormControls = FormControls;


  @ViewChild('searchElement') button: ElementRef | undefined;

  @HostListener('document:mousedown', ['$event'])
  onGlobalClick(event: MouseEvent): void {
    if (!this.button?.nativeElement.contains(event.target)) {
      this.isResults = false;
      this.searchForm.controls[FormControls.search].setValue('')
    }
  }

  private readonly MAX_SEARCH_SYMBOLS: number = 1;
  public routes = RoutesPath;
  public isResults: boolean = false;
  public fireUsers: Observable<UserStore[]>;
  public name: Subject<string> = new Subject<string>();

  constructor(private crudService: CrudService,
              private notifier: NotifierService) {
  }

  ngOnInit(): void {
    this.searchForm.addControl(FormControls.search, new FormControl('', Validators.maxLength(10)));

    this.fireUsers = this.name.pipe(
      filter(value => value.length > this.MAX_SEARCH_SYMBOLS),
      switchMap((value: string) => {
        return this.crudService.handleData<UserStore>(Collections.USERS).pipe(
          map((users: UserStore[]) => {
            return users.filter((i: UserStore) => {
              return i.techName?.trim().includes(value);
            })
          }),
          debounceTime(500)
        )
      })
    )
  }

  public isControlValid(controlName: string): boolean {
    const control: AbstractControl | undefined = this.searchForm?.controls[controlName];
    if (control) {
      if (control.value && control.value.match(/^[ ]+$/)) {
        control.setValue(control.value.trim());
      }
      return control.invalid && (control.dirty || control.touched);
    } else {
      return false;
    }
  }

  public showNote() {
    if (this.searchForm.controls[FormControls.search].invalid) {
      this.notifier.notify('error', 'Max Length is 5', 'INPUT__CONTROL')
    }
  }

  public clearInput() {
    this.isResults = false;
    this.searchForm.controls[FormControls.search].setValue('');
  }

  public showResult() {
    this.isResults = this.searchForm.controls[FormControls.search].value !== '';
    this.name.next(this.searchForm.controls[FormControls.search].value.trim().toLowerCase());
  }

}
