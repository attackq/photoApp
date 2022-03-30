import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { UserLogoComponent } from './user-logo/user-logo.component';
import { PopupComponent } from './popup/popup.component';
import {HeaderComponent} from "./header/header.component";
import {SearchComponent} from "./search/search.component";
import { HeadLogoComponent } from './head-logo/head-logo.component';
import { FilterComponent } from './filter/filter.component';
import { FilterPopupComponent } from './filter-popup/filter-popup.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HeaderComponent,
    UserLogoComponent,
    PopupComponent,
    SearchComponent,
    HeadLogoComponent,
    FilterComponent,
    FilterPopupComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
