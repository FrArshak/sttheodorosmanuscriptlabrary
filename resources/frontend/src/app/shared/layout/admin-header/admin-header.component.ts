import {Component, OnInit} from '@angular/core';
import { AuthService } from '../../../core/auth.service';
import { DefaultResponseType } from '../../../../types/default-response.type';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import {RouteCheckUtil} from "../../utils/checkTheRoute.util";
import {Router} from "@angular/router";
import {SettingsService} from "../../services/settings.service";
import {UserInfoType} from "../../../../types/userInfo.type";

@Component({
  selector: 'admin-header',
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.scss'
})
export class AdminHeaderComponent implements OnInit{

  showAdminHeader: boolean = true;
  dashBoardOrHomeLink = '/dashboard';

  dashBoardOrHomeText = 'Dashboard'

  adminInfo!: UserInfoType;

  name: string = '';

  img: string = '';
  constructor(private authService: AuthService, private _snackBar: MatSnackBar, private router: Router, private settingsService: SettingsService, private snackBar: MatSnackBar) {}

  ngOnInit() {
    let route;
    this.router.events.subscribe(() => {
      route = RouteCheckUtil.checkTheRoute(this.router.url, 'dashboard', 'settings', '/')
      if(route === 1 || route === 2) {
        this.dashBoardOrHomeLink = '/';
        this.dashBoardOrHomeText = 'Home'
      } else if(route === 3) {
        this.dashBoardOrHomeLink = '/dashboard';
        this.dashBoardOrHomeText = 'Dashboard'
      }
    });

    this.getAdminsInfo();

  }
  getAdminsInfo() {

    this.settingsService.getUserInfo()
      .subscribe({
        next: (response: DefaultResponseType | UserInfoType) => {
          if((response as DefaultResponseType).success === 0) {
            this.snackBar.open((response as DefaultResponseType).message);
          }

          this.adminInfo = response as UserInfoType;
          this.img = (response as UserInfoType).authUser.avatar as string;
          this.name = (response as UserInfoType).authUser.name as string;

        }
      })
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
