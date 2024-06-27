import {Component, OnInit} from '@angular/core';
import {CardComponent} from "../../../../shared/components/card/card.component";
import {AdminModalComponent} from "../../../../shared/components/admin-modal/admin-modal.component";
import {AuthService} from "../../../../core/auth.service";

@Component({
  selector: 'news',
  templateUrl: './news.component.html',
  styleUrl: './news.component.scss'
})
export class NewsComponent implements OnInit {

  isLogged: boolean = false;
  active: boolean = false;
  constructor(private authService: AuthService) {
    this.isLogged = this.authService.getIsLoggedIn();
  }

  ngOnInit() {
    this.authService.isLogged$.subscribe((isLoggedIn: boolean) => {
      this.isLogged = isLoggedIn;
    });
  }

  toggleActive() {
    this.active = !this.active;
  }
}
