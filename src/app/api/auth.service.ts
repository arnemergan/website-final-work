import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment'
import { Login, UserTokenDTO, User, UserInfoChanger,RegisterUser } from './models/models';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AuthService {
  private key = 'auth-token';
  private refreshKey = 'refresh-token';
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
    return this.http.get<UserTokenDTO>(this.actionUrl + "/refresh/" + this.getRefreshToken());
  }

  update(userInfo: UserInfoChanger): Observable<User>{
    return this.http.post<User>(this.actionUrl + "/update",userInfo);
  }

  public isLoggedIn() : boolean {
    return !!this.getToken();
  }

  public saveToken(userTokenDTO: UserTokenDTO) {
    this.removeToken();
    if(userTokenDTO.token.refreshToken !== null){
      this.removeRefreshToken();
      this.saveRefreshToken(userTokenDTO);
    }
    window.sessionStorage.setItem(this.key, userTokenDTO.token.accessToken);
  }

  public saveRefreshToken(userTokenDTO: UserTokenDTO){
    window.sessionStorage.setItem(this.refreshKey,userTokenDTO.token.refreshToken);
  }

  public getToken(): string {
    return sessionStorage.getItem(this.key);
  }

  public getRefreshToken(): string {
    return sessionStorage.getItem(this.refreshKey);
  }

  public removeToken(): void {
    window.sessionStorage.removeItem(this.key);
  }

  public removeRefreshToken(): void {
    window.sessionStorage.removeItem(this.key);
  }
}
