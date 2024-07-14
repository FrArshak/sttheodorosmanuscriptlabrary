import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'sidebar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {

  currentRoute: string = '';

  dashboardFlag: boolean = true;
  settingsFlag: boolean = false;
  constructor(private router: Router) {
  }

  ngOnInit() {
    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url;
      if(this.currentRoute.includes('dashboard')) {
        this.dashboardFlag = true;
        this.settingsFlag = false;
      } else if(this.currentRoute.includes('settings')) {
        this.dashboardFlag = false;
        this.settingsFlag = true;
      }
    })
  }
}
