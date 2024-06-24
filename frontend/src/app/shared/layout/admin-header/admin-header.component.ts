import { Component } from '@angular/core';
import { AuthService } from '../../../core/auth.service';
import { DefaultResponseType } from '../../../../types/default-response.type';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'admin-header',
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.scss'
})
export class AdminHeaderComponent {

  constructor(private authService: AuthService, private _snackBar: MatSnackBar) {}

  logout() {
    this.authService.logout()
      .subscribe( {
        next: (response: DefaultResponseType) => {
            this._snackBar.open(response.message);
            this.authService.clearToken();
        }
      })
  }
}
