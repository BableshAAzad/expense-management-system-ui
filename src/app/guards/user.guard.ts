import { Injectable } from '@angular/core';
import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {

  constructor(
    private router: Router,
    private authservice: AuthService
  ) { }

  // canActivate() {
  //   const user = this.authservice.currentUser;
  //   let currentUserData = this.authservice.currentUserData
  //   console.log('user info : ', user);
  //   console.log("currentUserData : ", currentUserData);

  //   if (user && (user.role === "admin")) {
  //     return true;
  //   }
  //   else {
  //     this.router.navigate(['/login']);
  //     return false;
  //   }

  // }

  canActivate() {
    let currentUserData: any = this.authservice.currentUserData
    let tokenExpiredTimeData: any = localStorage.getItem("tokenExpiredTime")
    let currentTime = new Date();
    let tokenExpiredTime = new Date(tokenExpiredTimeData);
    if (currentUserData) {
      // console.log("tokenExpiredTime : ", tokenExpiredTime);
      // console.log("currentTime : ", currentTime);
      // console.log("tokenExpiredTime > currentTime : ", tokenExpiredTime > currentTime);
      if (tokenExpiredTime > currentTime && currentUserData) {
        // console.log("currentUserData : ", currentUserData);
        if (currentUserData.role === "user") {
          // this.router.navigate(['/user']);
          return true;
        } else {
          this.router.navigate(['/']);
          return false;
        }
      } else {
        this.router.navigate(['/login']);
        return false;
      }
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}

