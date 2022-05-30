import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  public filterValue: string;

  public val$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor() { }

  get changedValue(): string {
    return this.filterValue;
  }

  set changedValue(val: string) {
    this.filterValue = val;
    this.val$.next(val);
  }
}
