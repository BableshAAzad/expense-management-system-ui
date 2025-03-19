import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './home/pages/about/about.component';
import { LoginComponent } from './auth/login/login.component';
import { RegistrationComponent } from './auth/registration/registration.component';

const routes: Routes = [
  { path: '', component: HomeComponent, title: "Expense Management System" },
  { path: 'about', component: AboutComponent, title: "About - EMS" },
  { path: 'login', component: LoginComponent, title: "Login - EMS" },
  { path: 'registration', component: RegistrationComponent, title:"Registration - EMS"  },
  { path: '', redirectTo: '/', pathMatch: 'full' }, // Default route (redirect to home)
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
