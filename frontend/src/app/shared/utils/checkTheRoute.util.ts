import { Router } from '@angular/router';

export class RouteCheckUtil {
  static checkTheRoute(currentRoute: string, firstRouteToCheck: string, secondRouteToCheck: string, thirdRouteToCheck: string = ''): number | boolean {

    if (currentRoute.includes(firstRouteToCheck)) {
      return 1;
    } else if (currentRoute.includes(secondRouteToCheck)) {
      return 2;
    } else if (currentRoute.includes(thirdRouteToCheck)) {
      return 3;
    }

    return false;
  }
}
