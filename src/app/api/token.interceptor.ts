import { HTTP_INTERCEPTORS, HttpErrorResponse, HttpEvent, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { AuthService } from './auth.service';
import { UserTokenDTO } from './models/models';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(err => {
      if (err.status === 401) {
          this.auth.refresh().subscribe((userTokenDTO:UserTokenDTO)=> {
            this.auth.saveToken(userTokenDTO);
          }, error => {
            this.router.navigate(["/main/login"]);
          });
-          location.reload(true);
      }
      const error = err.error.message || err.statusText;
      return throwError(error);
    }))
  }
}

export const TokenInterceptorProvider = [
  { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
];