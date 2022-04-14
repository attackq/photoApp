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
import { LoginPageComponent } from './login-page/login-page.component';
import { AppRoutingModule } from './app-routing.module';
import { AccountPageComponent } from './account-page/account-page.component';
import { AccountPopupComponent } from './account-popup/account-popup.component';
import {environment} from "../environments/environment";
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
import {AngularFireStorageModule} from "@angular/fire/compat/storage";
import { AuthGuard } from './services/auth/auth.guard';

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
    FooterComponent,
    LoginPageComponent,
    AccountPageComponent,
    AccountPopupComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    BrowserModule,
    BrowserAnimationsModule,
    ScrollingModule,
    AppRoutingModule,
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent],

})
export class AppModule { }
