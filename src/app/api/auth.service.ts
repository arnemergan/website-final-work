import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment'
import { Login, UserTokenDTO, User, UserInfoChanger,RegisterUser } from './models/models';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AuthService {
  private key = 'auth-token';
  private actionUrl = `${environment.baseApi}/authenticate`;

  constructor(private http: HttpClient,){}
  
  login(login: Login): Observable<UserTokenDTO>{
    return this.http.post<UserTokenDTO>(this.actionUrl + "/login",login);
  }

  register(register: RegisterUser): Observable<UserTokenDTO>{
    return this.http.post<UserTokenDTO>(this.actionUrl + "/register",register);
  }

  info(): Observable<User>{
    return this.http.get<User>(this.actionUrl + "/info");
  }

  refresh(): Observable<UserTokenDTO>{
    return this.http.get<UserTokenDTO>(this.actionUrl + "/refresh");
  }

  update(userInfo: UserInfoChanger): Observable<User>{
    return this.http.post<User>(this.actionUrl + "/update",userInfo);
  }


  public isLoggedIn() : boolean {
    return !!this.getToken();
  }

  public saveToken(token: string) {
    this.removeToken();
    window.sessionStorage.setItem(this.key, token);
  }

  public getToken(): string {
    return sessionStorage.getItem(this.key);
  }

  public removeToken(): void {
    window.sessionStorage.removeItem(this.key);
  }
}
