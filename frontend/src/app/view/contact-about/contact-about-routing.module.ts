import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ContactComponent} from "./contact/contact.component";
import {AboutComponent} from "./about/about.component";

const routes: Routes = [
  {path: 'contact', component: ContactComponent, data: {animation: 'Contact'}},
  {path: 'about-us', component: AboutComponent, data: {animation: 'About-us'}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactAboutRoutingModule { }
