import { HTTP_INTERCEPTORS, HttpErrorResponse, HttpEvent, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { AuthService } from './auth.service';
import { UserTokenDTO, TokenDto } from './models/models';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private called: boolean = false;


  constructor(private auth: AuthService, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(err => {
      if (err.status === 401 && !this.called) {
          this.called = true;
          this.auth.refresh().subscribe((token:TokenDto)=> {
            this.auth.saveRefresh(token);
            this.called = false;
          }, error => {
            this.auth.logout();
            this.router.navigate(["/main/login"]);
          });
      }
      const error = err.error.message || err.statusText;
      return throwError(error);
    }))
  }
}

export const TokenInterceptorProvider = [
  { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
];