// import { AfterViewInit, Component, ViewChild } from '@angular/core';
// import { MatPaginator } from '@angular/material/paginator';
// import { MatTableDataSource, MatTableModule } from '@angular/material/table';
// import { DataService } from 'src/app/services/data.service';
// import { PopupService } from 'src/app/services/popup.service';

// @Component({
//   selector: 'app-users',
//   templateUrl: './users.component.html',
//   styleUrls: ['./users.component.scss'],
// })

// export class UsersComponent implements AfterViewInit {
//   displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
//   users: object[] = []

//   constructor(
//     private dataService: DataService,
//     private popUp: PopupService) { }

//   ngOnInit(): void {
//     this.getUsers();
//   }

//   getUsers() {
//     this.dataService.getData('users').subscribe((res: any) => {
//       console.log("res.data : ", res);
//       this.users = res
//     });
//   }

//   dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

//   @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator | undefined;

//   ngAfterViewInit() {
//     if (this.paginator) {
//       this.dataSource.paginator = this.paginator;
//     }
//   }
// }

// export interface PeriodicElement {
//   name: string;
//   position: number;
//   weight: number;
//   symbol: string;
// }

// const ELEMENT_DATA: PeriodicElement[] = [
//   { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
//   { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
//   { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
//   { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
//   { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
//   { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
//   { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
//   { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
//   { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
//   { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
//   { position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na' },
//   { position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg' },
//   { position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al' },
//   { position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si' },
//   { position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P' },
//   { position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S' },
//   { position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl' },
//   { position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar' },
//   { position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K' },
//   { position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca' },
// ];




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
      console.log("Fetched users:", res);
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
