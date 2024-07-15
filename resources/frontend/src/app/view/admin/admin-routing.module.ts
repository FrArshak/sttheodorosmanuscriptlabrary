import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {SettingsComponent} from "./settings/settings.component";

const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent, data: { animation: 'DashboardComponent'}},
  {path: 'settings', component: SettingsComponent, data: {animation: 'Settings'}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
