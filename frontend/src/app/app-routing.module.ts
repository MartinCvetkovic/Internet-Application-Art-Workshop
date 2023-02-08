import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActiveWorkshopsComponent } from './active-workshops/active-workshops.component';
import { AttendedWorkshopsComponent } from './attended-workshops/attended-workshops.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { HomeComponent } from './home/home.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { LoginComponent } from './login/login.component';
import { MyActionsComponent } from './my-actions/my-actions.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { WorkshopDetailsComponent } from './workshop-details/workshop-details.component';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "profile", component: ProfileComponent},
  {path: "workshopDetails", component: WorkshopDetailsComponent},
  {path: "activeWorkshops", component: ActiveWorkshopsComponent},
  {path: "profile/myActions", component: MyActionsComponent},
  {path: "profile/attendedWorkshops", component: AttendedWorkshopsComponent},
  {path: "login", component: LoginComponent},
  {path: "loginAdmin", component: LoginAdminComponent},
  {path: "register", component: RegisterComponent},
  {path: "changePassword", component: ChangePasswordComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
