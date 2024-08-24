import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {ErrorService} from "./errorService";
import {SharedService} from "./sharedService";
import {Observable} from "rxjs";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient,
              private errorService: ErrorService,
              private sharedService: SharedService) {

  }
  startGame(difficulty: string, username: string): Observable<any> {
    const headers = this.sharedService.getAuthHeaders();
    const url = `${this.apiServerUrl}/game/start?difficulty=${difficulty}&username=${username}`;
    return this.http.post<any>(url, {}, { headers }).pipe(
      catchError(error => this.errorService.handleError(error, 'game'))
    );
  }


  getGameById(gameId: number | undefined): Observable<any> {
    const headers = this.sharedService.getAuthHeaders();
    const url = `${this.apiServerUrl}/game/${gameId}`;
    return this.http.get<any>(url, { headers }).pipe(
      catchError(error => this.errorService.handleError(error, 'game'))
    );
  }

  endGame(gameId: number): Observable<any> {
    const headers = this.sharedService.getAuthHeaders();
    const url = `${this.apiServerUrl}/game/${gameId}/end`;
    return this.http.post<any>(url, {}, { headers }).pipe(
      catchError(error => this.errorService.handleError(error, 'game'))
    );
  }

}

