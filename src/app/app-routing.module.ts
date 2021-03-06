import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {LoginPageComponent} from "./login-page/login-page.component";
import {AccountPageComponent} from "./account-page/account-page.component";
import {AuthGuard} from "./services/auth/auth.guard";
import {FeedPageComponent} from "./feed-page/feed-page.component";
import {ContentComponent} from "./content/content.component";
import {SavedContentComponent} from "./account-page/saved-content/saved-content.component";
import {TermsComponent} from "./terms/terms.component";
import {RoutesPath} from "./routes-path";
import {AboutComponent} from "./about/about.component";
import {PrivacyComponent} from "./privacy/privacy.component";
import {CheckUserGuard} from "./services/guards/check-user.guard";
import {CheckUserIdGuard} from "./services/guards/check-user-id.guard";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
// , CheckUserIdGuard
const routes: Routes = [
  {path: '', redirectTo: RoutesPath.login, pathMatch: 'full'},
  {path: RoutesPath.login, component: LoginPageComponent, canActivate: [CheckUserGuard]},
  {
    path: RoutesPath.accountId, component: AccountPageComponent, canActivate: [AuthGuard],
    children: [
      {
        path: '', component: ContentComponent,
      },
      {
        path: RoutesPath.saved, component: SavedContentComponent
      }
    ]
  },
  {path: RoutesPath.feed, component: FeedPageComponent, canActivate: [AuthGuard]},
  {path: RoutesPath.terms, component: TermsComponent},
  {path: RoutesPath.about, component: AboutComponent},
  {path: RoutesPath.privacy, component: PrivacyComponent},
  {path: RoutesPath.notfound, loadChildren: () => import('./not-found/not-found.module').then(m => m.NotFoundModule)},
  {path: '**', redirectTo: RoutesPath.notfound}
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
