import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment'
import { Tenant, Authority, UserAdmin, UserEnable } from './models/models';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private actionUrl = `${environment.baseApi}/user`;

  constructor(private http: HttpClient,) { }

  users(): Observable<Array<UserAdmin>>{
    return this.http.get<Array<UserAdmin>>(this.actionUrl + "/");
  }

  update(authority: Authority): Observable<UserAdmin>{
    return this.http.put<UserAdmin>(this.actionUrl + "/",authority);
  }

  enable(enabled:UserEnable): Observable<UserAdmin>{
    return this.http.put<UserAdmin>(this.actionUrl + "/enable", enabled);
  }
}
