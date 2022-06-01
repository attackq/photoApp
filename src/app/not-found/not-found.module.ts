import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PageNotFoundComponent} from "../page-not-found/page-not-found.component";
import {ButtonModule} from "../shared/button/button.module";
import {NotFoundRoutingModule} from "./not-found-routing.module";


@NgModule({
  declarations: [
    PageNotFoundComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    NotFoundRoutingModule
  ]
})
export class NotFoundModule { }
