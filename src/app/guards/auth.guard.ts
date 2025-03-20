import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    // Check if the user is already logged in by checking the presence of the token
    const token = localStorage.getItem('token');
    if (!token) {
      // If the user is logged in, allow access to the route
      return true;
    } else {
      // If not logged in, redirect to the home page (or wherever you'd like)
      this.router.navigate(['/']);
      return false;
    }
  }
}