import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { WorkshopDetailsComponent } from './workshop-details/workshop-details.component';
import { ActiveWorkshopsComponent } from './active-workshops/active-workshops.component';
import { AttendedWorkshopsComponent } from './attended-workshops/attended-workshops.component';
import { MyActionsComponent } from './my-actions/my-actions.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    LoginAdminComponent,
    ChangePasswordComponent,
    HomeComponent,
    ProfileComponent,
    WorkshopDetailsComponent,
    ActiveWorkshopsComponent,
    AttendedWorkshopsComponent,
    MyActionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
