import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faCircleInfo, faHome, faSignOutAlt, faUser, faUserShield } from '@fortawesome/free-solid-svg-icons';  // Import the icon
import { AuthService } from 'src/app/services/auth.service';
import { LogoutService } from 'src/app/services/logout.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  faHome = faHome
  faUser = faUser
  faSignOutAlt = faSignOutAlt
  faUserShield = faUserShield
  faCircleInfo = faCircleInfo
  constructor(
    private router: Router,
    public authService: AuthService,
    public logoutService: LogoutService
  ) {
    // console.log("authService : ", this.authService.isLoggedIn);
  }


  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  logout() {
    this.logoutService.logout("warning", "Are you want logout");
    // this.authService.logout();  // This will call logout from AuthService and redirect to login
  }
}
