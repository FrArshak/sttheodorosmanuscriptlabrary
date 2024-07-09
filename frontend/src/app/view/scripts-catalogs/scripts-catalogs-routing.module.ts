import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ScriptsCatalogsComponent} from "./scripts-catalogs.component";

const routes: Routes = [
  {path: 'catalogs', component: ScriptsCatalogsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScriptsCatalogsRoutingModule { }
