import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminsComponent } from './admins/admins.component';
import { ProfileComponent } from './profile/profile.component';

const adminRoutes: Routes = [
    {
        path: '',
        component: AdminComponent,
        children: [
            {
                path: 'dashboard',
                component: AdminDashboardComponent,
                title: 'Admin Dashboard - Expense Management System'
            },
            {
                path: 'admins',
                component: AdminsComponent,
                title: 'Admins - Expense Management System'
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
    imports: [RouterModule.forChild(adminRoutes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
