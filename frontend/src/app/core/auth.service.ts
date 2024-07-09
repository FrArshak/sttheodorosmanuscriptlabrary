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
  public accessTokenKey: string = 'Token';
  public isLogged$: Subject<boolean> = new Subject<boolean>();
  private isLogged: boolean = false;

  constructor(private http: HttpClient) {
    this.isLogged = !!localStorage.getItem(this.accessTokenKey);

  }
  public getIsLoggedIn(): boolean {
    return this.isLogged;
  }

  public setTokens(accessToken: string, userId: number): void {
    localStorage.setItem(this.accessTokenKey, accessToken);
    localStorage.setItem('userId', userId.toString())
    this.isLogged = true;
    this.isLogged$.next(true);
  }

  public getTokens(): {accessToken: string, userId: number} {
    return  {
      accessToken: localStorage.getItem(this.accessTokenKey) as string,
      userId: JSON.parse(localStorage.getItem('userId') as string)
    }
  }


  public clearTokens () {
    localStorage.removeItem(this.accessTokenKey);
    localStorage.removeItem('userId');

    this.isLogged$.next(false);
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

  logout(): Observable<DefaultResponseType> {
    const tokens = this.getTokens();
    return this.http.post<DefaultResponseType>(environment.api + 'logout', {Token: `Bearer ${tokens.accessToken}`})
  }




}
