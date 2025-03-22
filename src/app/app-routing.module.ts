import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './home/pages/about/about.component';
import { LoginComponent } from './auth/login/login.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { AdminGuard } from './guards/admin.guard';
import { AuthGuard } from './guards/auth.guard';
import { ErrorComponent } from './error/error.component';

const routes: Routes = [
  { path: '', component: HomeComponent, title: "Expense Management System" },
  { path: 'about', component: AboutComponent, title: "About - Expense Management System" },
  { path: 'login', component: LoginComponent, title: "Login - Expense Management System", canActivate: [AuthGuard] },
  { path: 'registration', component: RegistrationComponent, title: "Registration - Expense Management System", canActivate: [AuthGuard] },
  // {
  //   path: 'admin', component: AdminComponent, title: "Admin - Expense Management System", children: [
  //     { path: 'users', component: UsersComponent, title: "Users List - Expense Management System", }
  //   ]
  // },
  {
    path: 'admin',
    title: "Admin - Expense Management System",
    loadChildren: () => import('./home/admin/admin.module').then(m => m.AdminModule), // Lazy load AdminModule
    'canActivate': [AdminGuard],
  },
  // { path: '', redirectTo: '/', pathMatch: 'full' }, // Default route (redirect to home)
  // { path: '**', redirectTo: '/' }
  { path: '**', title: "Error - Expense Management System", component: ErrorComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
