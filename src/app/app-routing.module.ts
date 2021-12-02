import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { PrincipalComponent } from './principal/principal.component';
import { FormUserComponent } from './user/form/form-user.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/principal'},
  {path: 'principal', component:PrincipalComponent},
  {path: 'login', component:LoginComponent},
  {path: 'clientes', component:UserComponent},
  {path: 'userForm', component:FormUserComponent},
  {path: 'logout', component:LogoutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
