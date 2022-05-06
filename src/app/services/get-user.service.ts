import { Injectable } from '@angular/core';
import {CrudService} from "./crud/crud.service";
import {Collections} from "./crud/collections";
import {UserStore} from "../post";

@Injectable({
  providedIn: 'root'
})
export class GetUserService {

  constructor(private crudService: CrudService) { }

  getHero(id: string) {
    return this.crudService.handleIdData<UserStore>(Collections.USERS, id);
  }
}
