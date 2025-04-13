import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from 'src/app/services/data.service';
import { PopupService } from 'src/app/services/popup.service';
import { UpdateUserService } from 'src/app/services/update-user.service';

@Component({
  selector: 'app-users',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.scss'],
})
export class AdminsComponent implements AfterViewInit {
  displayedColumns: string[] = ['userId', 'username', 'email', 'role', 'createdDate', 'actions'];
  users: any[] = [];  // The data type should be 'any[]' since it's dynamic
  dataSource!: MatTableDataSource<any>;  // Using MatTableDataSource to manage pagination and filtering

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator | undefined;

  constructor(
    private dataService: DataService,
    private popUpService: PopupService,
    private updateUserService: UpdateUserService
  ) { }

  ngOnInit(): void {
    this.getUsers(); // Fetch the users on component initialization
  }

  // Method to fetch the user data
  getUsers(): void {
    this.dataService.getData('users').subscribe((res: any) => {
      this.users = res;  // Assign the fetched users to the users array
      this.dataSource = new MatTableDataSource(this.users); // Set the fetched users as the data source
      if (this.paginator) {
        this.dataSource.paginator = this.paginator; // Attach paginator after data is loaded
      }
    });
  }

  ngAfterViewInit() {
    // Ensure the paginator is assigned after view initialization
    if (this.paginator && this.dataSource) {
      this.dataSource.paginator = this.paginator;
    }
  }

  // DELETE user by ID
  delete(userId: string): void {
    this.dataService.deleteData(`users/${userId}`).subscribe(
      (res: any) => {
        console.log('User deleted successfully:', res);
        this.getUsers();  // Refresh the list of users
      },
      (err) => {
        console.error('Error deleting user:', err);
        this.popUpService.popup("error", err.error.error || "Delete failed due to server error", 10000);
      }
    );
  }

  edit(user: any): void {
    this.updateUserService.updateUser("warning", "Are you want edit?", user).subscribe({
      next: (res) => {
        this.getUsers(); // Refresh only if successful
      },
      error: (err) => {
        console.error("Update failed", err);
      },
      complete: () => {
        // Optional: handle dialog closed without update
      }
    });
  }

}

