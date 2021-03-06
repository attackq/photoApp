import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MAT_DIALOG_DATA, MatDialogModule} from "@angular/material/dialog";

import {AppComponent} from './app.component';
import {NavComponent} from './header/nav/nav.component';
import {UserLogoComponent} from './shared/user-logo/user-logo.component';
import {PopupComponent} from './header/popup/popup.component';
import {HeaderComponent} from "./header/header.component";
import {SearchComponent} from "./header/search/search.component";
import {HeadLogoComponent} from './header/head-logo/head-logo.component';
import {FilterComponent} from './filter/filter.component';
import {AccountComponent} from './account/account.component';
import {AccountInfoComponent} from './account/account-info/account-info.component';
import {ButtonComponent} from './shared/button/button.component';
import {ContentComponent} from './content/content.component';
import {PostComponent} from './content/post/post.component';
import {PostHoverComponent} from './content/post/post-hover/post-hover.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FooterComponent} from './footer/footer.component';
import {AppRoutingModule} from './app-routing.module';
import {AccountPageComponent} from './account-page/account-page.component';
import {AccountPopupComponent} from './account-popup/account-popup.component';
import {environment} from "../environments/environment";
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
import {AngularFireStorageModule} from "@angular/fire/compat/storage";
import {AuthGuard} from './services/auth/auth.guard';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {EditPopupComponent} from './content/post/edit-popup/edit-popup.component';
import {EditUserComponent} from './account/account-info/edit-user/edit-user.component';
import {PostExtendedComponent} from './content/post/post-extended/post-extended.component';
import {PostIconsComponent} from './shared/post-icons/post-icons.component';
import {FeedPageComponent} from './feed-page/feed-page.component';
import {SavedContentComponent} from './account-page/saved-content/saved-content.component';
import {FollowersComponent} from './account/account-info/followers/followers.component';
import {FollowingComponent} from './account/account-info/following/following.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {TermsComponent} from './terms/terms.component';
import {AboutComponent} from './about/about.component';
import {PrivacyComponent} from './privacy/privacy.component';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {NotifierModule} from 'angular-notifier';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {ServiceWorkerModule} from '@angular/service-worker'
import {ButtonModule} from "./shared/button/button.module";
import {NotFoundModule} from "./not-found/not-found.module";
import {LoginPageComponent} from "./login-page/login-page.component";
import { LikesPopupComponent } from './shared/post-icons/likes-popup/likes-popup.component';
import {UrlSerializer} from "@angular/router";
import {CustomUrlSerializer} from "./services/customUrlSerializer";

@NgModule({
  providers: [{
    provide: UrlSerializer, useClass: CustomUrlSerializer
  }],
  declarations: [
    AppComponent,
    NavComponent,
    HeaderComponent,
    UserLogoComponent,
    LoginPageComponent,
    PopupComponent,
    SearchComponent,
    HeadLogoComponent,
    FilterComponent,
    AccountComponent,
    AccountInfoComponent,
    ContentComponent,
    PostComponent,
    PostHoverComponent,
    FooterComponent,
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
    TermsComponent,
    AboutComponent,
    PrivacyComponent,
    LikesPopupComponent,
    // PageNotFoundComponent,
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
    FormsModule,
    ClipboardModule,
    ButtonModule,
    NotFoundModule,
    NotifierModule.withConfig({
      behaviour: {
        autoHide: 3000,
        onClick: false,
        stacking: 3,
      },
      position: {
        horizontal: {
          position: "right"
        }
      }
    }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  bootstrap: [AppComponent],

})
export class AppModule {
}
