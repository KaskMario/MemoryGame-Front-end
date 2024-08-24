import {Component, OnInit} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {UsersComponent} from "./components/users/user.component";
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {AuthService} from "./service/authService";
import {NgClass, NgIf} from "@angular/common";
import {GameBoardComponent} from "./components/game-board/game-board.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    UsersComponent,
    GameBoardComponent,
    LoginComponent,
    RegisterComponent,
    UsersComponent, NgClass, NgIf, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Memory Game';
  isLoggedIn: boolean = false;
  loggedInUsername: string = '';
  userRole: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.loadToken();
    this.authService.isLoggedIn().subscribe(isLoggedIn => this.isLoggedIn = isLoggedIn);
    this.authService.getLoggedInUsername().subscribe(username => this.loggedInUsername = username);
    this.authService.getUserRole().subscribe(role => this.userRole = role);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
