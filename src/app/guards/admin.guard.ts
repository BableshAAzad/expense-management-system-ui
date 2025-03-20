import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private router: Router,
    private authservice: AuthService
  ) { }

  canActivate() {
    const user = this.authservice.currentUser;
    // console.log('role-user', user);

    if (user && (user.role === "admin")) {
      return true;
    }
    else {
      this.router.navigate(['/login']);
      return false;
    }

  }

}

