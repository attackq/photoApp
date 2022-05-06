import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import {LoginPageComponent} from "./login-page/login-page.component";
import {AccountPageComponent} from "./account-page/account-page.component";
import {AuthGuard} from "./services/auth/auth.guard";

const routes: Routes = [
  { path: 'login', component: LoginPageComponent},
  { path: 'account/:id', component: AccountPageComponent, canActivate: [AuthGuard]},
  { path: '', redirectTo: 'login', pathMatch: 'full'},
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
