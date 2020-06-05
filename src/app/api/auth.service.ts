import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment'
import { Login, UserTokenDTO, User, UserInfoChanger,RegisterUser, TokenDto, AuthorityUser, registereduser, passwordChanger } from './models/models';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthService {
  private key = 'auth-token';
  private refreshKey = 'refresh-token';
  private rolekey = 'user-role';
  private actionUrl = `${environment.baseApi}/authenticate`;

  constructor(private http: HttpClient,){
  }
  
  login(login: Login): Observable<UserTokenDTO>{
    return this.http.post<UserTokenDTO>(this.actionUrl + "/login",login).pipe(map((user:UserTokenDTO)  => {
      if(user && user.token && user.token.accessToken && user.token.refreshToken){
        this.saveToken(user);
        this.saveRefreshToken(user);
        this.saveRole(user);
      }
      return user;
    }));
  }

  logout():void{
      this.removeRefreshToken();
      this.removeToken();
      this.removeRole();
  }

  register(register: RegisterUser): Observable<registereduser>{
    return this.http.post<registereduser>(this.actionUrl + "/register",register);
  }

  info(): Observable<User>{
    return this.http.get<User>(this.actionUrl + "/info");
  }

  refresh(): Observable<TokenDto>{
    return this.http.get<TokenDto>(this.actionUrl + "/refresh-token?token=" + this.getRefreshToken());
  }

  update(userInfo: UserInfoChanger): Observable<User>{
    return this.http.post<User>(this.actionUrl + "/update",userInfo);
  }

  changepasswordfirst(token: string, username: string, passwordchanger:passwordChanger): Observable<User>{
    return this.http.post<User>(this.actionUrl + "/change-password-first?token=" + token +"&user=" + username,passwordchanger)
  }

  hasPermission(auth: AuthorityUser) {
    if (this.getRole() && this.getRole().find(permission => {return permission.authority === auth.authority;})) {
        return true;
    }
    return false;
}

  public isLoggedIn() : boolean {
    return !!this.getToken();
  }

  public saveToken(userTokenDTO: UserTokenDTO) {
    this.removeToken();
    localStorage.setItem(this.key, userTokenDTO.token.accessToken);
  }

  public saveRefreshToken(userTokenDTO: UserTokenDTO){
    this.removeRefreshToken();
    localStorage.setItem(this.refreshKey,userTokenDTO.token.refreshToken)
  }

  public saveRefresh(tokenDto:TokenDto){
    this.removeToken();
    localStorage.setItem(this.key, tokenDto.accessToken);
  }

  public getToken(): string {
    return localStorage.getItem(this.key);
  }

  private getRefreshToken(): string {
    return localStorage.getItem(this.refreshKey);
  }

  private removeToken(): void {
    localStorage.removeItem(this.key);
  }

  private removeRefreshToken(): void {
    localStorage.removeItem(this.refreshKey);
  }

  private removeRole(): void {
    localStorage.removeItem(this.rolekey);
  }

  private getRole(): AuthorityUser[]{
    return JSON.parse(localStorage.getItem(this.rolekey));
  } 

  private saveRole(userTokenDTO:UserTokenDTO): void{
    localStorage.setItem(this.rolekey,JSON.stringify(userTokenDTO.authorities))
  }
}
