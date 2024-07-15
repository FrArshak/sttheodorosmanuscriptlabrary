import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { LoaderService } from '../shared/services/loader.service';
import { finalize } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private loaderService: LoaderService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const isLogged = this.authService.getIsLoggedIn();
    this.loaderService.show();

    if (isLogged) {
      const tokens = this.authService.getTokens();
      const authToken = tokens.accessToken;
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      return next.handle(authReq).pipe(
        finalize(() => this.loaderService.hide())
      );
    }

    return next.handle(req).pipe(
      finalize(() => this.loaderService.hide())
    );
  }
}
