import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { PrincipalComponent } from './principal/principal.component';
import { FormUserComponent } from './user/form/form-user.component';
import { LogoutComponent } from './logout/logout.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MenuComponent } from './menu/menu.component';
import { PasswordComponent } from './passwords/password.component';
import { FormPasswordComponent } from './passwords/form/form-password.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    LoginComponent,
    PrincipalComponent,
    FormUserComponent,
    LogoutComponent,
    MenuComponent,
    PasswordComponent,
    FormPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
