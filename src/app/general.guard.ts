import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './api/auth.service';

@Injectable({
  providedIn: 'root'
})
export class GeneralGuard implements CanActivate {
  constructor(private authService:AuthService,private router:Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.authService.hasPermission({authority:"ROLE_EDIT"}) ||this.authService.hasPermission({authority:"ROLE_ADMIN"}) || this.authService.hasPermission({authority:"ROLE_VIEW"})) {
        return true;
      }
      return false;
  }
  
}
