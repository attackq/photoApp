import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {LoginPageComponent} from "./login-page/login-page.component";
import {AccountPageComponent} from "./account-page/account-page.component";
import {AuthGuard} from "./services/auth/auth.guard";
import * as path from "path";
import {FeedPageComponent} from "./feed-page/feed-page.component";
import {ContentComponent} from "./content/content.component";
import {SavedContentComponent} from "./account-page/saved-content/saved-content.component";
import {PostExtendedComponent} from "./content/post/post-extended/post-extended.component";
import {TermsComponent} from "./terms/terms.component";
import {RoutesPath} from "./routes-path";
import {AboutComponent} from "./about/about.component";
import {PrivacyComponent} from "./privacy/privacy.component";

const routes: Routes = [
  {
    path: 'account/:id', component: AccountPageComponent, canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: ContentComponent,
      },
      {
        path: 'saved', component: SavedContentComponent
      }
    ]
  },
  {path: 'login', component: LoginPageComponent},
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'feed', component: FeedPageComponent},
  {path: RoutesPath.terms, component: TermsComponent},
  {path: RoutesPath.about, component: AboutComponent},
  {path: RoutesPath.privacy, component: PrivacyComponent},



  // {path: '**', component: LoginPageComponent}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
