import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { DashboardComponent } from '../app/dashboard/dashboard.component';
import {AuthGuard} from './authGaurd/auth.guard'
const routes: Routes = [
  {
    path: 'register', component: RegisterComponent
  },
  { path : 'login', component: LoginComponent},
  { path : 'forgetpassword', component: ForgetpasswordComponent},
  { path : 'resetpassword/:token', component: ResetpasswordComponent},
  {
    path: 'Dashboard', component: DashboardComponent, canActivate: [AuthGuard]
  },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

