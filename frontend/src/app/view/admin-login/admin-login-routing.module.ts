import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './admin-login.component';
import { AuthForwardGuard } from '../../core/auth-forward.guard';

const routes: Routes = [
  {
    path: 'login',
    component: AdminLoginComponent,
    data: { animation: 'AdminLoginPage' },
    canActivate: [AuthForwardGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminLoginRoutingModule {}
