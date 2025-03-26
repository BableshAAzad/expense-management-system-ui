import { Component, OnDestroy } from '@angular/core';
import { faMobileRetro } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { Subscription } from 'rxjs';
import { PopupService } from 'src/app/services/popup.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnDestroy {
  user: any;
  userInfo: any;
  faMobileRetro = faMobileRetro;
  private userInfoSubscription: Subscription = new Subscription;

  constructor(private authService: AuthService, private dataService: DataService, popupService: PopupService) {
    // Initialize the user data
    this.user = this.authService.currentUserData;

    // Log to check if user is correctly initialized
    // console.log('user:', this.user);

    // Check if user and user.id are valid before making the request
    if (this.user && this.user.userId) {
      // Subscribe to the data service to fetch user info
      this.userInfoSubscription = this.dataService.getData(`users/${this.user.userId}`).subscribe(
        (ele) => {
          // console.log("ele : ", ele);
          this.userInfo = ele; // Assign the fetched data to userInfo
        },
        (error) => {
          console.error('Error fetching user data:', error); // Handle error
          popupService.popup("error", error?.error?.error || "error occurred", 5000)
        }
      );
    } else {
      console.error('User ID is not valid:', this.user);
      popupService.popup("error", "User ID is not valid", 5000)
    }
  }

  ngOnDestroy() {
    // Unsubscribe to avoid memory leaks
    if (this.userInfoSubscription) {
      this.userInfoSubscription.unsubscribe();
    }
  }
}
