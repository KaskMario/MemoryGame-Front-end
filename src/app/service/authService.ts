import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { ErrorService } from './errorService';
import { jwtDecode } from 'jwt-decode';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiServerUrl = environment.apiBaseUrl;
  private loggedIn = new BehaviorSubject<boolean>(false);
  private loggedInUsername = new BehaviorSubject<string>('');
  private userRole = new BehaviorSubject<string>('');

  constructor(private http: HttpClient, private errorService: ErrorService) {
    this.loadToken();
  }

  login(username: string, password: string): Observable<string> {
    const url = `${this.apiServerUrl}/auth/login`;
    return this.http.post(url, { username, password }, { responseType: 'text' }).pipe(
      map(response => response as string),
      tap(token => {
        localStorage.setItem('token', token);
        this.setAuthState(token);
      }),
      catchError(error => this.errorService.handleError(error, 'auth'))
    );
  }

  register(username: string, password: string, firstName: string, lastName: string, email: string): Observable<string> {
    const url = `${this.apiServerUrl}/auth/register`;
    const user = { username, password, firstName, lastName, email };

    return this.http.post(url, user, { responseType: 'text' }).pipe(
      map(response => response as string),
      catchError(error => this.errorService.handleError(error, 'auth'))
    );
  }

  registerAdmin(username: string, password: string, firstName: string, lastName: string, email: string, adminKey: string): Observable<string> {
    const url = `${this.apiServerUrl}/auth/register-admin`;
    const params = new HttpParams().set('adminKey', adminKey);
    return this.http.post(url, { username, password, firstName, lastName, email }, { params, responseType: 'text' }).pipe(
      map(response => response as string),
      catchError(error => this.errorService.handleError(error, 'auth'))
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.loggedIn.next(false);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  getLoggedInUsername(): Observable<string> {
    return this.loggedInUsername.asObservable();
  }

  getUserRole(): Observable<string> {
    return this.userRole.asObservable();
  }

  public loadToken(): void {
    const token = localStorage.getItem('token');
    if (token && !this.isTokenExpired(token)) {
      this.setAuthState(token);
    }
  }

  private setAuthState(token: string): void {
    const decodedToken: any = jwtDecode(token);
    this.loggedInUsername.next(decodedToken.username);
    this.userRole.next(decodedToken.roles[0]);
    this.loggedIn.next(true);
  }

  private isTokenExpired(token: string): boolean {
    const decodedToken: any = jwtDecode(token);
    const expiryTime = decodedToken.exp * 1000;
    return (Date.now() > expiryTime);
  }

  private getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }
}
