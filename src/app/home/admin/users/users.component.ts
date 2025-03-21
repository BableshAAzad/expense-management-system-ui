import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from 'src/app/services/data.service';
import { PopupService } from 'src/app/services/popup.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements AfterViewInit {
  displayedColumns: string[] = ['userId', 'username', 'email', 'role', 'createdDate'];
  users: any[] = [];  // The data type should be 'any[]' since it's dynamic

  dataSource!: MatTableDataSource<any>;  // Using MatTableDataSource to manage pagination and filtering

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator | undefined;

  constructor(
    private dataService: DataService,
    private popUp: PopupService
  ) {}

  ngOnInit(): void {
    this.getUsers(); // Fetch the users on component initialization
  }

  // Method to fetch the user data
  getUsers(): void {
    this.dataService.getData('users').subscribe((res: any) => {
      // console.log("Fetched users:", res);
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
}
