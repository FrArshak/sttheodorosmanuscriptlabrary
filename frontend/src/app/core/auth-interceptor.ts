import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const isLogged = this.authService.getIsLoggedIn();
    if (isLogged) {
      const authToken = this.authService.getAccessToken();
      const authReq = req.clone({
        setHeaders: {
          Token: `Bearer ${authToken}`,
        },
      });
      return next.handle(authReq);
    }
    return next.handle(req);
  }
}
