import { Component, ElementRef, OnDestroy, ViewChild, ViewChildren } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { PopupService } from 'src/app/services/popup.service';
import { faMobileRetro, faUserPen } from '@fortawesome/free-solid-svg-icons';
import { UpdateUserService } from 'src/app/services/update-user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnDestroy {
  user: any;
  userInfo: any;
  faMobileRetro = faMobileRetro;
  faUserPen = faUserPen;
  private userInfoSubscription: Subscription = new Subscription;
  selectedImageUrl: string | ArrayBuffer | null = null;
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef<HTMLInputElement>;


  constructor(
    private authService: AuthService,
    private dataService: DataService,
    popupService: PopupService,
    private updateUserService: UpdateUserService,
    private router: Router,

  ) {
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

  ngAfterViewInit() {
    // Optional: confirm it's defined
    if (!this.fileInput) {
      console.warn('fileInput not defined yet');
    }
  }

  triggerFileInput() {
    if (this.fileInput?.nativeElement) {
      this.fileInput.nativeElement.click();
    } else {
      console.error('fileInput is undefined');
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImageUrl = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }


  edit(user: any): void {
    this.updateUserService.updateUser("warning", "Are you want edit?", user).subscribe({
      next: (res) => {
        this.router.navigate(['/user']);
      },
      error: (err) => {
        console.error("Update failed", err);
      },
      complete: () => {
        // Optional: handle dialog closed without update
      }
    });
  }

}