import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminLoginRoutingModule } from './admin-login-routing.module';
import { AdminLoginComponent } from './admin-login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [AdminLoginComponent],
  imports: [CommonModule, SharedModule, RouterModule, ReactiveFormsModule, AdminLoginRoutingModule],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AdminLoginModule {}
