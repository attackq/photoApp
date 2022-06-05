import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ShareService {

  public filterString: BehaviorSubject<string> = new BehaviorSubject<string>('');

  public customerLink: Subject<string> = new Subject<string>();

  constructor() { }
}
