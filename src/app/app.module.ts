import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {ScrollingModule} from '@angular/cdk/scrolling';

import { AppComponent } from './app.component';
import { NavComponent } from './header/nav/nav.component';
import { UserLogoComponent } from './shared/user-logo/user-logo.component';
import { PopupComponent } from './header/popup/popup.component';
import {HeaderComponent} from "./header/header.component";
import {SearchComponent} from "./header/search/search.component";
import { HeadLogoComponent } from './header/head-logo/head-logo.component';
import { FilterComponent } from './filter/filter.component';
import { FilterPopupComponent } from './filter/filter-popup/filter-popup.component';
import { AccountComponent } from './account/account.component';
import { AccountInfoComponent } from './account/account-info/account-info.component';
import { ButtonComponent } from './shared/button/button.component';
import { ContentComponent } from './content/content.component';
import { PostComponent } from './content/post/post.component';
import { PostHoverComponent } from './content/post/post-hover/post-hover.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './footer/footer.component';

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
    FilterPopupComponent,
    AccountComponent,
    AccountInfoComponent,
    ButtonComponent,
    ContentComponent,
    PostComponent,
    PostHoverComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ScrollingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
