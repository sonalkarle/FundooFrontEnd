import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
const routes: Routes = [
  {
    path: 'register', component: RegisterComponent
  },
  { path : 'login', component: LoginComponent},
  { path : 'forgetpassword', component: ForgetpasswordComponent},
  { path : 'resetpassword/:token', component: ResetpasswordComponent},
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

