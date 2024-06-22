import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'header',
  // standalone: true,
  // imports: [
  //   RouterLink
  // ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  menuFlag: boolean = false;

  toggleMenu() {
    this.menuFlag = !this.menuFlag;
  }

}
