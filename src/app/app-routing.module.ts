import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './home/pages/about/about.component';
import { LoginComponent } from './auth/login/login.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { AdminGuard } from './guards/admin.guard';
import { AuthGuard } from './guards/auth.guard';
import { ErrorComponent } from './error/error.component';
import { UserGuard } from './guards/user.guard';

const routes: Routes = [
  { path: '', component: HomeComponent, title: "Expense Management System" },
  { path: 'about', component: AboutComponent, title: "About - Expense Management System" },
  { path: 'login', component: LoginComponent, title: "Login - Expense Management System", canActivate: [AuthGuard] },
  { path: 'registration', component: RegistrationComponent, title: "Registration - Expense Management System", canActivate: [AuthGuard] },
  {
    path: 'admin',
    title: "Admin - Expense Management System",
    loadChildren: () => import('./home/admin/admin.module').then(m => m.AdminModule), // Lazy load AdminModule
    'canActivate': [AdminGuard],
  },
  {
    path: 'user',
    title: "User - Expense Management System",
    loadChildren: () => import('./home/user/user.module').then(u => u.UserModule), // Lazy load UserModule
    'canActivate': [UserGuard],
  },
  { path: '**', title: "Error - Expense Management System", component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
