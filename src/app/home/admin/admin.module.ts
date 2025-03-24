import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminsComponent } from './admins/admins.component';


@NgModule({
  declarations: [
    AdminDashboardComponent,
    AdminsComponent
  ],
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatTableModule, 
    MatButtonModule,
    AdminRoutingModule,
  ]
})
export class AdminModule { }
