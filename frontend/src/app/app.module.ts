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
import { MyMessagesComponent } from './my-messages/my-messages.component';
import { MyWorkshopsComponent } from './my-workshops/my-workshops.component';
import { WorkshopMessagesComponent } from './workshop-messages/workshop-messages.component';
import { EditWorkshopComponent } from './edit-workshop/edit-workshop.component';
import { NewWorkshopComponent } from './new-workshop/new-workshop.component';
import { ShowSignupsComponent } from './show-signups/show-signups.component';
import { RegistrationsComponent } from './registrations/registrations.component';

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
    MyActionsComponent,
    MyMessagesComponent,
    MyWorkshopsComponent,
    WorkshopMessagesComponent,
    EditWorkshopComponent,
    NewWorkshopComponent,
    ShowSignupsComponent,
    RegistrationsComponent
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
