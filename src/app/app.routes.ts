import {RouterModule, Routes} from '@angular/router';
import {RegisterComponent} from "./components/register/register.component";
import {LoginComponent} from "./components/login/login.component";
import {UsersComponent} from "./components/users/user.component";
import {NgModule} from "@angular/core";
import {AuthRedirectGuard} from "./auth-redirect.guard";
import {HomeComponent} from "./components/home/home.component";
import {authGuard} from "./auth.guard";
import {GameBoardComponent} from "./components/game-board/game-board.component";

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'game-board', component: GameBoardComponent, canActivate: [authGuard] },
  { path: '', component: HomeComponent, canActivate: [AuthRedirectGuard] },
  { path: 'users', component: UsersComponent, canActivate: [authGuard]},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
