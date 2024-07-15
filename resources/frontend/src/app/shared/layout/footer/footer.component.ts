import {Component, OnInit} from '@angular/core';
import {SettingsService} from "../../services/settings.service";
import {SettingsType} from "../../../../types/settings.type";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {GeneralSettingsType} from "../../../../types/general-settings.type";
import {HttpErrorResponse} from "@angular/common/http";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit {

  settings!: SettingsType;

  address: string = '';
  businessHours: string = '';
  email: string = '';
  phone: string = '';

  constructor(private settingsService: SettingsService) {
  }

  ngOnInit() {
    this.settingsService.getSettings()
      .subscribe({
        next: (response: DefaultResponseType | GeneralSettingsType) => {
          if((response as DefaultResponseType).success === 0) {
            throw new Error((response as DefaultResponseType).message);
          }
          this.settings = ((response as GeneralSettingsType).settings) as SettingsType;

          this.address = this.settings.address.setting_value;
          this.businessHours = this.settings.businessHours.setting_value;
          this.email = this.settings.email.setting_value;
          this.phone = this.settings.phone.setting_value;

        },
        error: (error: HttpErrorResponse) => {
          throw new Error(error.message);
        }
      })
  }
}
