import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { Role } from '../models/role';
import { catchError, throwError } from 'rxjs';
import { AuthService } from './authService';
import {ErrorService} from "./errorService";
import {SharedService} from "./sharedService";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiServerUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient,
              private errorService : ErrorService,
              private sharedService: SharedService) { }


  public getUsers(): Observable<User[]>{
    const headers = this.sharedService.getAuthHeaders();
    return this.http.get<User []>(`${this.apiServerUrl}/users/all`, { headers}).pipe(
      catchError(error => this.errorService.handleError(error, 'user'))
    );
  }

  public getRoles(): Observable<Role[]>{
    const headers = this.sharedService.getAuthHeaders();
    return this.http.get<Role []>(`${this.apiServerUrl}/users/roles`, { headers}).pipe(
      catchError(error => this.errorService.handleError(error, 'user'))
    );
  }


  updateUser(id : number, updatedUser: any)  {
    const url = `${this.apiServerUrl}/users/update`;
    const headers = this.sharedService.getAuthHeaders();
    return this.http.put<any>(url, updatedUser, { headers }).pipe(
      catchError(error => this.errorService.handleError(error, 'user'))
    );
  }

  deleteUser(userId : number) : Observable<void> {
    const headers = this.sharedService.getAuthHeaders();
    const params = new HttpParams().set('userId', userId.toString());
    return this.http.delete<void>(`${this.apiServerUrl}/users/delete`, { headers, params }).pipe(
      catchError(error => this.errorService.handleError(error, 'user'))
    );
  }

  getUserByUsername(username : string) : Observable<User> {
    const headers = this.sharedService.getAuthHeaders();
    const params = new HttpParams().set('username', username);
    return this.http.get<User>(`${this.apiServerUrl}/users/user`, { headers, params}).pipe(
      catchError(error => this.errorService.handleError(error, 'user'))
    );
  }


}




