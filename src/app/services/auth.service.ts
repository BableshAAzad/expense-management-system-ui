import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private jwtHelper: JwtHelperService,
    private router: Router
  ) { }

  // Returns true if the user is logged in
  get isLoggedIn(): boolean {
    let token = localStorage.getItem('token');
    return !!token && !this.jwtHelper.isTokenExpired(token!); // 'token!' tells TypeScript that token is not null
  }

  // Decodes and returns the current user info
  get currentUser() {
    let token = localStorage.getItem('token');
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return this.jwtHelper.decodeToken(token);
    }
    return null;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    this.router.navigate(['/login']);
  }
}
