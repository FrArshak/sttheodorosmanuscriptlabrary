import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactAboutRoutingModule } from './contact-about-routing.module';
import {ContactComponent} from "./contact/contact.component";
import {ContactFormComponent} from "../../shared/components/contact-form/contact-form.component";
import {SupportMissionComponent} from "../../shared/components/support-mission/support-mission.component";


@NgModule({
  declarations: [ContactComponent],
  imports: [
    CommonModule,
    ContactFormComponent,
    ContactAboutRoutingModule,
    SupportMissionComponent
  ]
})
export class ContactAboutModule { }
