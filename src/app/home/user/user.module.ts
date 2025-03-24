import { NgModule } from '@angular/core';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UsersComponent } from './users/users.component';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
  declarations: [
    UserDashboardComponent,
    UsersComponent
  ],
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatTableModule, 
    MatButtonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
