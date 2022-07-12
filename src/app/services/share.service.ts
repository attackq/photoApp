import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ShareService {


  private filterString$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private customerLink$: Subject<string> = new Subject<string>();
  private sharePostLink: Subject<string> = new Subject<string>();

  public setCustomerLink(id: string) {
    this.customerLink$.next(id);
  }

  public getCustomerLink() {
    return this.customerLink$.asObservable()
  }

  public setFilterString(id: string) {
    this.filterString$.next(id);
  }

  public getFilterString() {
    return this.filterString$.asObservable()
  }

  public setSharePostLink(id: string) {
    this.filterString$.next(id);
  }

  public getSharePostLink() {
    return this.filterString$.asObservable()
  }



  constructor() { }
}
