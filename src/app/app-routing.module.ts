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
  { path: 'about', component: AboutComponent, title: "About - EMS" },
  { path: 'login', component: LoginComponent, title: "Login - EMS", canActivate: [AuthGuard] },
  { path: 'registration', component: RegistrationComponent, title: "Registration - EMS", canActivate: [AuthGuard] },
  // {
  //   path: 'admin', component: AdminComponent, title: "Admin - EMS", children: [
  //     { path: 'users', component: UsersComponent, title: "Users List - EMS", }
  //   ]
  // },
  {
    path: 'admin',
    title: "Admin - EMS",
    loadChildren: () => import('./home/admin/admin.module').then(m => m.AdminModule), // Lazy load AdminModule
    'canActivate': [AdminGuard],
  },
  // { path: '', redirectTo: '/', pathMatch: 'full' }, // Default route (redirect to home)
  // { path: '**', redirectTo: '/' }
  { path: '**', component: ErrorComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
