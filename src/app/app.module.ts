import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { MatDialogModule} from "@angular/material/dialog";

import { AppComponent } from './app.component';
import { NavComponent } from './header/nav/nav.component';
import { UserLogoComponent } from './shared/user-logo/user-logo.component';
import { PopupComponent } from './header/popup/popup.component';
import {HeaderComponent} from "./header/header.component";
import {SearchComponent} from "./header/search/search.component";
import { HeadLogoComponent } from './header/head-logo/head-logo.component';
import { FilterComponent } from './filter/filter.component';
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
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import { EditPopupComponent } from './content/post/edit-popup/edit-popup.component';
import { EditUserComponent } from './account/account-info/edit-user/edit-user.component';
import { PostExtendedComponent } from './content/post/post-extended/post-extended.component';
import { PostIconsComponent } from './shared/post-icons/post-icons/post-icons.component';
import { FeedPageComponent } from './feed-page/feed-page.component';
import { SavedContentComponent } from './account-page/saved-content/saved-content.component';
import { FollowersComponent } from './account/account-info/followers/followers.component';
import { FollowingComponent } from './account/account-info/following/following.component';
import {MatSidenavModule} from '@angular/material/sidenav';

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
    EditPopupComponent,
    EditUserComponent,
    PostExtendedComponent,
    PostIconsComponent,
    FeedPageComponent,
    SavedContentComponent,
    FollowersComponent,
    FollowingComponent,
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
    MatDialogModule,
    ReactiveFormsModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSidenavModule,
    FormsModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent],

})
export class AppModule { }
