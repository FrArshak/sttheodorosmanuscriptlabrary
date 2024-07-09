import {Component, OnInit} from '@angular/core';
import { AuthService } from '../../../core/auth.service';
import { DefaultResponseType } from '../../../../types/default-response.type';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import {RouteCheckUtil} from "../../utils/checkTheRoute.util";
import {Router} from "@angular/router";

@Component({
  selector: 'admin-header',
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.scss'
})
export class AdminHeaderComponent implements OnInit{

  showAdminHeader: boolean = true;
  dashBoardOrHomeLink = '/dashboard';

  dashBoardOrHomeText = 'Go to the Dashboard'
  constructor(private authService: AuthService, private _snackBar: MatSnackBar, private router: Router) {}

  ngOnInit() {
    let route;
    this.router.events.subscribe(() => {
      route = RouteCheckUtil.checkTheRoute(this.router.url, 'dashboard', 'settings', '/')
      console.log(route);
      if(route === 1 || route === 2) {
        console.log(route)
        this.dashBoardOrHomeLink = '/';
        this.dashBoardOrHomeText = 'Home'
      } else if(route === 3) {
        this.dashBoardOrHomeLink = '/dashboard';
        this.dashBoardOrHomeText = 'Go to the Dashboard'
      }
    });


  }

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
