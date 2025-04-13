import { NgModule } from '@angular/core';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { UsersComponent } from './users/users.component';
import { ProfileComponent } from './profile/profile.component';

const userRoutes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      {
        path: 'dashboard',
        component: UserDashboardComponent,
        title: 'User Dashboard - Expense Management System'
      },
      {
        path: 'users',
        component: UsersComponent,
        title: 'Users - Expense Management System'
      },
      {
        path: 'profile',
        component: ProfileComponent,
        title: 'Profile - Expense Management System'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(userRoutes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
