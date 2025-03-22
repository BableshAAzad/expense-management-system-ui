import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { AuthService } from './auth.service';
import { PopupService } from './popup.service';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor(
    public authService: AuthService,
    private dataService: DataService,
    private popUp: PopupService
  ) { }


  handleLogout() {
    this.dataService.postData('logout', {}).subscribe(
      (res: any) => {
        // console.log("Response:", res);
        if (res.error) {
          this.popUp.popup("error", res.error.error || "Logout failed try again", 5000);
        } else if (res.data) {
          // console.log("res:", res);
        }
      },
      (error) => {
        console.error("Logout API Error:", error);
        this.popUp.popup("error", error?.error?.error || "Server error try again latter", 5000);
      }
    );
  }

  logout(icon: any, text: string) {
    Swal.fire({
      title: "Are you sure want to logout?",
      showDenyButton: true,
      denyButtonText: 'Logout',
      confirmButtonText: 'Cancel',
      width: 600,
      padding: "3em",
      color: "#fff",
      // background: "#fff url(assets/images/logout.png)",
      background: "#fff linear-gradient(to right, red, blue)",
      backdrop: `
        rgba(0,0,123,0.4)
        left top
        no-repeat
      `
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        // Swal.fire("Saved!", "", "success");
        // console.log("result.isConfirmed : ", result.isConfirmed);
      } else if (result.isDenied) {
        // Swal.fire("Changes are not saved", "", "info");
        // console.log("result.isDenied: ", result.isDenied);
        this.authService.logout();  // This will call logout from AuthService and redirect to login
        this.handleLogout()
      }
    });
  }


}
