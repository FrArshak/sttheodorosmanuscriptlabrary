import { AfterViewInit, Component, OnInit } from '@angular/core';
import {
  RouterOutlet,
  Router,
  ActivatedRoute,
} from '@angular/router';
import { slideInAnimation } from './shared/utils/route-animation';
import { AuthService } from './core/auth.service';
import {LoaderService} from "./shared/services/loader.service";
import {StatisticsService} from "./shared/services/statistics.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Meta} from '@angular/platform-browser'
import {SettingsService} from "./shared/services/settings.service";
import {DefaultResponseType} from "../types/default-response.type";
import {GeneralSettingsType} from "../types/general-settings.type";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [slideInAnimation],
})
export class AppComponent implements OnInit {
  title = 'frontend';
  showHeader: boolean = true;
  isLogged: boolean = false;
  currentRoute: string = '';
  loaderIsShowed: boolean = false;

  showAdminHeader: boolean = false;

  settingsMetaTitle: {name: string, content: string} = {name: 'metaTitle', content: ''};
  settingsMetaDesc: {name: string, content: string} = {name: 'metaDescription', content: ''};

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private loaderService: LoaderService,
    private statisticsService: StatisticsService,

    private meta: Meta,
    private settingsService: SettingsService
  ) {
    this.isLogged = this.authService.getIsLoggedIn();

    this.loaderService.$loading.subscribe(isShowed => {
      this.loaderIsShowed = isShowed
    })
  }

  ngOnInit() {

    this.settingsService.getSettings()
      .subscribe({
        next: (response: DefaultResponseType | GeneralSettingsType) => {
          if((response as DefaultResponseType).success === 0 ){
            throw new Error((response as DefaultResponseType).message);
          }

          this.settingsMetaTitle.content = (response as GeneralSettingsType).settings.metaTitle.setting_value as string;
          this.settingsMetaDesc.content = (response as GeneralSettingsType).settings.metaDesc.setting_value as string;

          this.meta.addTags([
            this.settingsMetaTitle,
            this.settingsMetaDesc
          ]);

        },
      })

    this.statisticsService.countVisitor()
      .subscribe({
        next: (response) => {
          console.log(response)
        },
        error: (error: HttpErrorResponse) => {
          throw new Error(error.message);
        }
      })


    this.currentRoute = this.router.url;
    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url;
      if (this.currentRoute === '/login') {
        this.showHeader = false;
      } else if (this.currentRoute === '/') {
        this.showHeader = true;
        this.isLogged = this.authService.getIsLoggedIn();
      } else if (this.currentRoute === '/dashboard' || this.currentRoute === '/settings') {
        this.showHeader = false;
        this.showAdminHeader = true;
        this.isLogged = this.authService.getIsLoggedIn();
      }
    });
  }

  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animation']
    );
  }
}
