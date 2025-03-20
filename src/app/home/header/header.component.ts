import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faHome, faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';  // Import the icon
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  faHome = faHome
  faUser = faUser
  faSignOutAlt = faSignOutAlt
  constructor(private router: Router, public authService: AuthService) { }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  logout() {
    this.authService.logout();  // This will call logout from AuthService and redirect to login
  }
}
