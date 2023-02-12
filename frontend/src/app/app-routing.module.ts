import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActiveWorkshopsComponent } from './active-workshops/active-workshops.component';
import { AttendedWorkshopsComponent } from './attended-workshops/attended-workshops.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { EditWorkshopComponent } from './edit-workshop/edit-workshop.component';
import { HomeComponent } from './home/home.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { LoginComponent } from './login/login.component';
import { MyActionsComponent } from './my-actions/my-actions.component';
import { MyMessagesComponent } from './my-messages/my-messages.component';
import { MyWorkshopsComponent } from './my-workshops/my-workshops.component';
import { NewWorkshopComponent } from './new-workshop/new-workshop.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { ShowSignupsComponent } from './show-signups/show-signups.component';
import { WorkshopDetailsComponent } from './workshop-details/workshop-details.component';
import { WorkshopMessagesComponent } from './workshop-messages/workshop-messages.component';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "profile", component: ProfileComponent},
  {path: "workshopDetails", component: WorkshopDetailsComponent},
  {path: "activeWorkshops", component: ActiveWorkshopsComponent},
  {path: "profile/myActions", component: MyActionsComponent},
  {path: "profile/myMessages", component: MyMessagesComponent},
  {path: "profile/attendedWorkshops", component: AttendedWorkshopsComponent},
  {path: "login", component: LoginComponent},
  {path: "loginAdmin", component: LoginAdminComponent},
  {path: "register", component: RegisterComponent},
  {path: "changePassword", component: ChangePasswordComponent},
  {path: "newWorkshop", component: NewWorkshopComponent},
  {path: "myWorkshops", component: MyWorkshopsComponent},
  {path: "myWorkshops/workshopMessages", component: WorkshopMessagesComponent},
  {path: "myWorkshops/editWorkshop", component: EditWorkshopComponent},
  {path: "myWorkshops/showSignups", component: ShowSignupsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
