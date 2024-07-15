// shared.module.ts
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "./layout/header/header.component";
import { AdminHeaderComponent } from './layout/admin-header/admin-header.component';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { TruncatePipe } from "./pipes/truncate.pipe";
import {AdminModalComponent} from "./components/admin-modal/admin-modal.component";

@NgModule({
  declarations: [
    HeaderComponent,
    AdminHeaderComponent,

    // Other components, directives, pipes
  ],
  imports: [
    CommonModule,
    MatMenuModule,
    FormsModule,
    RouterModule,
    // Other modules
  ],
  exports: [
    HeaderComponent,
    AdminHeaderComponent,
    // Other components, directives, pipes to be used outside this module
  ],
  providers: [TruncatePipe, AdminModalComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ],
})
export class SharedModule { }
