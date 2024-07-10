import { AfterViewInit, Component, OnInit } from '@angular/core';
import {
  RouterOutlet,
  Router,
  ActivatedRoute,
} from '@angular/router';
import { slideInAnimation } from './shared/utils/route-animation';
import { AuthService } from './core/auth.service';
import {LoaderService} from "./shared/services/loader.service";

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

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private loaderService: LoaderService
  ) {
    this.isLogged = this.authService.getIsLoggedIn();

    this.loaderService.$loading.subscribe(isShowed => {
      this.loaderIsShowed = isShowed
    })
  }

  ngOnInit() {
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
