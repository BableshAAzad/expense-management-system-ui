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
  // get isLoggedIn(): boolean {
  //   let token = localStorage.getItem('token');
  //   return !!token && !this.jwtHelper.isTokenExpired(token!); // 'token!' tells TypeScript that token is not null
  // }

  get isLoggedIn(): boolean {
    let userData = localStorage.getItem('userData');
    let tokenExpiredTimeData: any = localStorage.getItem("tokenExpiredTime")
    let currentTime = new Date();
    let tokenExpiredTime = new Date(tokenExpiredTimeData);
    if ((tokenExpiredTime > currentTime) && userData)
      return true;
    else
      return false;
  }

  // Decodes and returns the current user info
  get currentUser() {
    let token = localStorage.getItem('token');
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return this.jwtHelper.decodeToken(token);
    }
    return null;
  }

  // Decodes and returns the current user info
  get currentUserData() {
    let userData = localStorage.getItem('userData');
    if (userData)
      return JSON.parse(userData);
    return null;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    this.router.navigate(['/login']);
  }
}
