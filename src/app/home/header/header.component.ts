import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faHome, faUser } from '@fortawesome/free-solid-svg-icons';  // Import the icon

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  faHome = faHome
  faUser = faUser
  constructor(private router: Router) { }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
