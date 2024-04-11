import { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth/auth.service';
import { Provider } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@Injectable(

)

export class authInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { };

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    debugger;
    const authToken = this.authService.getAuthToken();

    if (authToken) {
      const authReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${authToken}`)
      });
      return next.handle(authReq);
    }
    return next.handle(req);
  }


  // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  //   const authToken = localStorage.getItem('access_token');
  //   if (authToken) {
  //     const authReq = req.clone({
  //       headers: req.headers.set(`Authorization`, `Bearer ${authToken}`)
  //     });
  //     return next.handle(authReq);
  //   }
  //   return next.handle(req);
  // }
}