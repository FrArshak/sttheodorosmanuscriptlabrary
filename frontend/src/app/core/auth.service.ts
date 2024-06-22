import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { LoginType } from '../../types/login.type';
import { DefaultResponseType } from '../../types/default-response.type';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public accessTokenKey: string = 'Authorization';

  constructor(private http: HttpClient) {
    this.isLogged = !!localStorage.getItem(this.accessTokenKey);
    console.log(this.isLogged);
  }

  public isLogged$: Subject<boolean> = new Subject<boolean>();
  private isLogged: boolean = false;

  public getIsLoggedIn(): boolean {
    return this.isLogged;
  }

  login(
    email: string,
    password: string,
    rememberMe: boolean
  ): Observable<LoginType | DefaultResponseType> {
    return this.http.post<LoginType | DefaultResponseType>(
      environment.api + 'login',
      { email, password, rememberMe }
    );
  }

  public setTokens(accessToken: string): void {
    localStorage.setItem(this.accessTokenKey, accessToken);
    this.isLogged = true;
    this.isLogged$.next(true);
  }

  public getAccessToken(): string {
    return localStorage.getItem(this.accessTokenKey) as string;
  }
}
