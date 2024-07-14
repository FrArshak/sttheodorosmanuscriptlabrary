import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {SettingsComponent} from "./settings/settings.component";
import {SidebarComponent} from "../../shared/components/sidebar/sidebar.component";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [DashboardComponent, SettingsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    SidebarComponent
  ],
  exports: []
})
export class AdminModule { }
