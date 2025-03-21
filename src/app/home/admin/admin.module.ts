import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { UsersComponent } from './users/users.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [
    UsersComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatPaginatorModule,
    MatTableModule, 
    MatButtonModule,
    
  ]
})
export class AdminModule { }
