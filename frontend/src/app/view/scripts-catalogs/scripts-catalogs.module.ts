import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScriptsCatalogsRoutingModule } from './scripts-catalogs-routing.module';
import {CatalogComponent} from "../../shared/components/catalog/catalog.component";
import {ScriptsCatalogsComponent} from "./scripts-catalogs.component";
import {AdminModalComponent} from "../../shared/components/admin-modal/admin-modal.component";
import {ModalComponent} from "../../shared/components/modal/modal.component";


@NgModule({
  declarations: [ScriptsCatalogsComponent],
    imports: [
        CommonModule,
        CatalogComponent,
        ScriptsCatalogsRoutingModule,
        AdminModalComponent,
        ModalComponent
    ],
  exports: [ScriptsCatalogsComponent]
})
export class ScriptsCatalogsModule { }
