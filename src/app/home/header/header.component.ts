import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faCircleHalfStroke, faCircleInfo, faGlobe, faHome, faSignOutAlt, faUser, faUserShield } from '@fortawesome/free-solid-svg-icons';  // Import the icon
import { AuthService } from 'src/app/services/auth.service';
import { LogoutService } from 'src/app/services/logout.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  faHome = faHome
  faUser = faUser
  faSignOutAlt = faSignOutAlt
  faUserShield = faUserShield
  faCircleInfo = faCircleInfo
  faCircleHalfStroke = faCircleHalfStroke
  faGlobe = faGlobe
  theme: string;
  isOnline: boolean;

  constructor(
    private router: Router,
    public authService: AuthService,
    public logoutService: LogoutService
  ) {
    // console.log("authService : ", this.authService.isLoggedIn);
    // Default theme is light if no theme is saved
    this.theme = localStorage.getItem('theme') || 'light';
    // Check the initial online status
    this.isOnline = navigator.onLine;
  }

  ngOnInit() {
    this.setTheme(this.theme); // Apply the theme on initialization

    // Listen for online and offline events
    window.addEventListener('online', this.handleOnline);
    window.addEventListener('offline', this.handleOffline);
  }

  ngOnDestroy() {
    // Cleanup the event listeners when the component is destroyed
    window.removeEventListener('online', this.handleOnline);
    window.removeEventListener('offline', this.handleOffline);
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  logout() {
    this.logoutService.logout("warning", "Are you want logout");
    // this.authService.logout();  // This will call logout from AuthService and redirect to login
  }


  toggleDarkMode() {
    this.theme = this.theme === 'light' ? 'dark' : 'light'; // Toggle between light and dark mode
    this.setTheme(this.theme); // Apply the theme
    localStorage.setItem('theme', this.theme); // Store the theme in local storage
  }

  // Function to set the theme
  private setTheme(theme: string) {
    const htmlElement = document.documentElement; // Get the <html> element
    if (theme === 'dark') {
      htmlElement.classList.add('dark');
    } else {
      htmlElement.classList.remove('dark');
    }
  }

  // Method to handle online event
  handleOnline = () => {
    this.isOnline = true;
  };

  // Method to handle offline event
  handleOffline = () => {
    this.isOnline = false;
  };

}
