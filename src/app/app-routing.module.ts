import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {LoginPageComponent} from "./login-page/login-page.component";
import {AccountPageComponent} from "./account-page/account-page.component";
import {AuthGuard} from "./services/auth/auth.guard";
import * as path from "path";
import {FeedPageComponent} from "./feed-page/feed-page.component";
import {ContentComponent} from "./content/content.component";
import {SavedContentComponent} from "./account-page/saved-content/saved-content.component";

const routes: Routes = [
  {
    path: 'account/:id', component: AccountPageComponent, canActivate: [AuthGuard],
    children: [
      {
        path: '', component: ContentComponent
      },
      {
        path: 'saved', component: SavedContentComponent
      }
    ]
  },
  {path: 'login', component: LoginPageComponent},
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'feed', component: FeedPageComponent},

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
