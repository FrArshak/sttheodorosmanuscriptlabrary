import { Component } from '@angular/core';
import {Router, NavigationEnd} from "@angular/router";
import {SettingsService} from "../../services/settings.service";

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  menuFlag: boolean = false;

  menuItemsEn: string[] = ['Home', 'About Us',  'Catalogs',  'Articles', 'News', 'Contact Us']
  menuItemsAm: string[] = ['Գլխաւոր', 'Մեր Մասին',  'Կատալոգներ',  'Հոդվածներ', 'Նորութիւններ', 'Կապ']

  menuItems: string[] = this.menuItemsEn;

  lang: string = 'en';

  isEn: boolean = true;

  constructor(private settingsService: SettingsService,  private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.menuFlag = false;
      }
    });
  }

  toggleMenu() {
    this.menuFlag = !this.menuFlag;
  }

  chooseLang() {
    this.lang = this.lang === 'en' ? 'am' : 'en';
    this.settingsService.changeLang(this.lang);
  }

}
