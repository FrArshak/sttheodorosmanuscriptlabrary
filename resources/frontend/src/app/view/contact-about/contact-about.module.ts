import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactAboutRoutingModule } from './contact-about-routing.module';
import {ContactComponent} from "./contact/contact.component";
import {ContactFormComponent} from "../../shared/components/contact-form/contact-form.component";
import {SupportMissionComponent} from "../../shared/components/support-mission/support-mission.component";
import {FooterComponent} from "../../shared/layout/footer/footer.component";
import {AboutComponent} from "./about/about.component";
import {BannerTextSliderComponent} from "../../shared/components/banner-text-slider/banner-text-slider.component";
import {AboutUsComponent} from "../../shared/components/about-us/about-us.component";


// @ts-ignore
@NgModule({
  declarations: [ContactComponent, AboutComponent],
  imports: [
    CommonModule,
    ContactFormComponent,
    ContactAboutRoutingModule,
    SupportMissionComponent,
    FooterComponent,
    BannerTextSliderComponent,
    AboutUsComponent
  ],
  exports: [ContactComponent, AboutComponent]
})
export class ContactAboutModule { }
