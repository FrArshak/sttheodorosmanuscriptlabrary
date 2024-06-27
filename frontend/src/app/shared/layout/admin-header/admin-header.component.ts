import { Component } from '@angular/core';
import { AuthService } from '../../../core/auth.service';
import { DefaultResponseType } from '../../../../types/default-response.type';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'admin-header',
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.scss'
})
export class AdminHeaderComponent {

  showAdminHeader: boolean = true;

  constructor(private authService: AuthService, private _snackBar: MatSnackBar) {}

  logout() {
    this.authService.logout()
      .subscribe( {
        next: (response: DefaultResponseType) => {
            this._snackBar.open(response.message);
            this.authService.clearTokens();
            this.showAdminHeader = false;
        },
        error: (error: HttpErrorResponse) => {
          this._snackBar.open(error.message);
        }
      })
  }
}
