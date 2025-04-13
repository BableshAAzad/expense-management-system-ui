import { NgModule } from '@angular/core';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UsersComponent } from './users/users.component';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { UserRoutingModule } from './user-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    UserDashboardComponent,
    UsersComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatTableModule, 
    MatButtonModule,
    UserRoutingModule,
    FontAwesomeModule
  ]
})
export class UserModule { }
