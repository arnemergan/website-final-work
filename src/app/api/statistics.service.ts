import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Statistics } from './models/models';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  private actionUrl = `${environment.baseApi}/statistics`;
  private token: String;

  constructor(private http: HttpClient,private auth: AuthService) { }


  setToken(token:string){
    this.token = token;
  }


  getStats(): Observable<Statistics>{
    return this.http.get<Statistics>(this.actionUrl);
  }
}
