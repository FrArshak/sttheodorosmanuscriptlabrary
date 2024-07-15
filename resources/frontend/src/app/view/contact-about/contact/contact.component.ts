import {Component, OnInit} from '@angular/core';
import {SettingsService} from "../../../shared/services/settings.service";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {GeneralSettingsType} from "../../../../types/general-settings.type";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SettingsType} from "../../../../types/settings.type";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {MainComponent} from "../../main/main.component";
import {AuthService} from "../../../core/auth.service";
import {PostService} from "../../../shared/services/post.service";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent extends MainComponent implements OnInit{

  settings!: SettingsType;

  addressOnMap: string = '';

  address: string = '';
  businessHours: string = '';
  email: string = '';
  phone: string = '';

  safeAddressOnMap!: SafeHtml;
  constructor(private snackBar: MatSnackBar,private settingsService: SettingsService, private sanitizer: DomSanitizer,
              postService: PostService, authService: AuthService) {
    super(postService, authService);
  }

  override ngOnInit() {
    super.ngOnInit();
    this.settingsService.getSettings()
      .subscribe({
        next: (response: DefaultResponseType | GeneralSettingsType) => {
          if((response as DefaultResponseType).success === 0) {
            this.snackBar.open((response as DefaultResponseType).message);
          }
          this.settings = ((response as GeneralSettingsType).settings) as SettingsType;
          this.addressOnMap = this.settings.addressOnMap.setting_value;

          const modifiedIframe = this.modifyIframe(this.addressOnMap, 1088, 560);
          this.safeAddressOnMap = this.sanitizer.bypassSecurityTrustHtml(modifiedIframe);
          this.address = this.settings.address.setting_value;
          this.businessHours = this.settings.businessHours.setting_value;
          this.email = this.settings.email.setting_value;
          this.phone = this.settings.phone.setting_value;

        },
      })
  }

  modifyIframe(iframe: string, width: number, height: number): string {
    // Update the width and height attributes of the iframe string
    const widthRegex = /width="\d+"/;
    const heightRegex = /height="\d+"/;

    // If the width and height attributes already exist, replace them
    let modifiedIframe = iframe.replace(widthRegex, `width="${width}"`);
    modifiedIframe = modifiedIframe.replace(heightRegex, `height="${height}"`);

    // If the width and height attributes do not exist, add them
    if (!widthRegex.test(iframe)) {
      modifiedIframe = modifiedIframe.replace('<iframe', `<iframe width="${width}"`);
    }
    if (!heightRegex.test(iframe)) {
      modifiedIframe = modifiedIframe.replace('<iframe', `<iframe height="${height}"`);
    }

    return modifiedIframe;
  }
}
