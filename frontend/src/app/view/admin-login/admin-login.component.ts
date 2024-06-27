import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { DefaultResponseType } from '../../../types/default-response.type';
import { LoginType } from '../../../types/login.type';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.scss',
})
export class AdminLoginComponent {
  showHeader: boolean = true;

  isLoggedIn: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private AuthService: AuthService,
    private router: Router
  ) {}

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    rememberMe: [false],
  });

  ngOnInit() {}

  login() {
    if (this.loginForm.valid && this.loginForm.value.email && this.loginForm.value.password) {
      this.AuthService.login(
        this.loginForm.value.email,
        this.loginForm.value.password,
        !!this.loginForm.value.rememberMe
      ).subscribe({
        next: (data: LoginType | DefaultResponseType) => {
          let error;
          if ((data as DefaultResponseType).success === 0) {
            error = (data as DefaultResponseType).message;
            this._snackBar.open('Incorrect email or password');
            return;
          }
          const loginResponse = data as LoginType;
          if (!loginResponse.authToken || !loginResponse.authUser.id) {
            error = 'Error during authorization';
          }
          if(loginResponse.authToken) {
            this.authService.setTokens(loginResponse.authToken, loginResponse.authUser.id);
          } else {
            this._snackBar.open('There was an error during the authentication please try again');
            this.authService.clearTokens();
            this.router.navigate(['/']);
          }

          this.router.navigate(['/']);
          // this.authService.userId = loginResponse.userId;

          // this.authService.getUserInfo()
          //   .subscribe({
          //     next: (data: LoginType | DefaultResponseType) => {
          //       if((data as DefaultResponseType).success === 0) {
          //         this._snackBar.open('There is an Error during getting the name')
          //       }
          //
          //       // this.userInfo = data as UserInfoType;
          //       // this.userService.setUserName(this.userInfo.name);
          //
          //
          //     }
          //   })
        },
        error: (error: HttpErrorResponse) => {
          if (error.error && error.error.message) {
            this._snackBar.open(error.error.message);
          } else {
            this._snackBar.open('Error during the authorization');
          }
        },
      });
    }
  }
}
