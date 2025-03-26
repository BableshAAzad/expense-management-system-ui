import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminsComponent } from './admins/admins.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { ProfileComponent } from './profile/profile.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AdminDashboardComponent,
    AdminsComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatTableModule, 
    MatButtonModule,
    AdminRoutingModule,
    MatGridListModule,
    FontAwesomeModule,
  ]
})
export class AdminModule { }
