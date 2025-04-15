// import { Component, ElementRef, OnDestroy, ViewChild, ViewChildren } from '@angular/core';
// import { Subscription } from 'rxjs';
// import { AuthService } from 'src/app/services/auth.service';
// import { DataService } from 'src/app/services/data.service';
// import { PopupService } from 'src/app/services/popup.service';
// import { faMobileRetro, faUpLong, faUserPen } from '@fortawesome/free-solid-svg-icons';
// import { UpdateUserService } from 'src/app/services/update-user.service';
// import { Router } from '@angular/router';
// import { environment } from "../../../../environments/environment"

// @Component({
//   selector: 'app-profile',
//   templateUrl: './profile.component.html',
//   styleUrls: ['./profile.component.scss']
// })
// export class ProfileComponent implements OnDestroy {
//   user: any;
//   userInfo: any;
//   faMobileRetro = faMobileRetro;
//   faUserPen = faUserPen;
//   faUpLong = faUpLong

//   private userInfoSubscription: Subscription = new Subscription;

//   selectedImageUrl: string | ArrayBuffer | null = null;
//   imageObject: object = { url: "", id: "" }
//   @ViewChild('fileInput', { static: false }) fileInput!: ElementRef<HTMLInputElement>;

//   constructor(
//     private authService: AuthService,
//     private dataService: DataService,
//     popupService: PopupService,
//     private updateUserService: UpdateUserService,
//     private router: Router,

//   ) {
//     // Initialize the user data
//     this.user = this.authService.currentUserData;

//     // Log to check if user is correctly initialized
//     // console.log('user:', this.user);

//     // Check if user and user.id are valid before making the request
//     if (this.user && this.user.userId) {
//       // Subscribe to the data service to fetch user info
//       this.userInfoSubscription = this.dataService.getData(`users/${this.user.userId}`).subscribe(
//         (ele) => {
//           // console.log("ele : ", ele);
//           this.userInfo = ele; // Assign the fetched data to userInfo
//         },
//         (error) => {
//           console.error('Error fetching user data:', error); // Handle error
//           popupService.popup("error", error?.error?.error || "error occurred", 5000)
//         }
//       );
//     } else {
//       console.error('User ID is not valid:', this.user);
//       popupService.popup("error", "User ID is not valid", 5000)
//     }
//   }

//   // onFileSelected(event: Event) {
//   //   const input = event.target as HTMLInputElement;
//   //   const file = input.files?.[0];

//   //   if (!file) {
//   //     console.warn('No file selected');
//   //     return;
//   //   }

//   //   const formData = new FormData();
//   //   formData.append('file', file);

//   //   // Upload the image
//   //   this.dataService.postDataForFile(`add-image?folderName=user`, formData).subscribe({
//   //     next: (res) => {
//   //       console.log('Photo uploaded successfully', res);

//   //       // If response contains the URL
//   //       if (res?.url) {
//   //         this.imageObject = res;
//   //         this.selectedImageUrl = `${environment.rootUrl_for_file}${res.url}`;
//   //       } else {
//   //         console.warn("Upload succeeded but no URL returned.");
//   //       }
//   //     },
//   //     error: (err) => {
//   //       console.error('Failed to upload photo', err);
//   //     }
//   //   });
//   // }


//   // updateProfilePhoto() {
//   //   this.dataService.postData(`add-image?folderName=user`, this.imageObject).subscribe({
//   //     next: (res) => {
//   //       console.log('Photo uploaded successfully', res);
//   //       this.selectedImageUrl = `${environment.rootUrl_for_file}${res.url}` || null; // Reset the preview if needed
//   //       // Optionally, re-fetch the user info or update UI
//   //     },
//   //     error: (err) => {
//   //       console.error('Failed to upload photo', err);
//   //     }
//   //   });
//   // }

//   // saveImageReferenceToUser() {
//   //   const payload = {
//   //     userId: this.user.userId,
//   //     profilePhoto: this.imageObject.url
//   //   };

//   //   this.dataService.postData(`users/${this.user.userId}/update-photo`, payload).subscribe({
//   //     next: () => {
//   //       console.log('Profile photo updated in user data');
//   //     },
//   //     error: (err) => {
//   //       console.error('Failed to save image to profile', err);
//   //     }
//   //   });
//   // }


//   onFileSelected(event: Event) {
//     const input = event.target as HTMLInputElement;
//     const file = input.files?.[0];

//     if (!file) {
//       console.warn('No file selected');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('file', file);

//     this.dataService.postDataForFile<UploadResponse>(`add-image?folderName=user`, formData).subscribe({
//       next: (res) => {
//         console.log('Photo uploaded successfully', res);
//         if (res?.url) {
//           this.imageObject = res;
//           this.selectedImageUrl = `${environment.rootUrl_for_file}${res.url}`;
//         } else {
//           console.warn("Upload succeeded but no URL returned.");
//         }
//       },
//       error: (err) => {
//         console.error('Failed to upload photo', err);
//       }
//     });
//   }

//   saveImageReferenceToUser() {
//     const payload = {
//       userId: this.user.userId,
//       profilePhoto: this.imageObject.url
//     };

//     this.dataService.postData(`users/${this.user.userId}/update-photo`, payload).subscribe({
//       next: () => {
//         console.log('Profile photo updated in user data');
//         this.popupService.popup("success", "Profile image saved successfully!", 3000);
//       },
//       error: (err) => {
//         console.error('Failed to save image to profile', err);
//         this.popupService.popup("error", "Failed to save image", 3000);
//       }
//     });
//   }

//   ngOnDestroy() {
//     // Unsubscribe to avoid memory leaks
//     if (this.userInfoSubscription) {
//       this.userInfoSubscription.unsubscribe();
//     }
//   }

//   ngAfterViewInit() {
//     // Optional: confirm it's defined
//     if (!this.fileInput) {
//       console.warn('fileInput not defined yet');
//     }
//   }

//   triggerFileInput() {
//     if (this.fileInput?.nativeElement) {
//       this.fileInput.nativeElement.click();
//     } else {
//       console.error('fileInput is undefined');
//     }
//   }

//   edit(user: any): void {
//     this.updateUserService.updateUser("warning", "Are you want edit?", user).subscribe({
//       next: (res) => {
//         this.router.navigate(['/user']);
//       },
//       error: (err) => {
//         console.error("Update failed", err);
//       },
//       complete: () => {
//         // Optional: handle dialog closed without update
//       }
//     });
//   }

//   // updateProfilePhoto() {
//   //   const inputEl = this.fileInput?.nativeElement;
//   //   const file: File | null = inputEl?.files?.[0] || null;

//   //   if (!file) {
//   //     console.warn('No file selected');
//   //     return;
//   //   }

//   //   const formData = new FormData();
//   //   formData.append('file', file);

//   //   this.dataService.postData(`users/${this.user.userId}/upload-photo`, formData).subscribe({
//   //     next: (res) => {
//   //       console.log('Photo uploaded successfully', res);
//   //       this.selectedImageUrl = null; // Reset the preview if needed
//   //       // Optionally, re-fetch the user info or update UI
//   //     },
//   //     error: (err) => {
//   //       console.error('Failed to upload photo', err);
//   //     }
//   //   });
//   // }





// }















import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { PopupService } from 'src/app/services/popup.service';
import { faMobileRetro, faUpLong, faUserPen } from '@fortawesome/free-solid-svg-icons';
import { UpdateUserService } from 'src/app/services/update-user.service';
import { Router } from '@angular/router';
import { environment } from "../../../../environments/environment";

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
  faUpLong = faUpLong;

  private userInfoSubscription: Subscription = new Subscription;
  selectedImageUrl: string | null = null;
  imageObject: any = { url: '', id: "" };

  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef<HTMLInputElement>;

  constructor(
    private authService: AuthService,
    private dataService: DataService,
    private popupService: PopupService,
    private updateUserService: UpdateUserService,
    private router: Router,
  ) {
    this.user = this.authService.currentUserData;

    if (this.user && this.user.userId) {
      this.userInfoSubscription = this.dataService.getData(`users/${this.user.userId}`).subscribe(
        (ele) => {
          this.userInfo = ele;
        },
        (error) => {
          console.error('Error fetching user data:', error);
          this.popupService.popup("error", error?.error?.error || "error occurred", 5000);
        }
      );
    } else {
      console.error('User ID is not valid:', this.user);
      this.popupService.popup("error", "User ID is not valid", 5000);
    }
  }

  ngOnDestroy() {
    if (this.userInfoSubscription) {
      this.userInfoSubscription.unsubscribe();
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

    if (!file) {
      console.warn('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    this.dataService.postDataForFile(`add-image?folderName=user`, formData).subscribe({
      next: (res: any) => {
        console.log('Photo uploaded successfully', res);
        if (res?.url) {
          this.imageObject = res;
          this.selectedImageUrl = `${environment.rootUrl_for_file}${res.url}`;
        } else {
          console.warn("Upload succeeded but no URL returned.");
        }
      },
      error: (err) => {
        console.error('Failed to upload photo', err);
      }
    });
  }

  saveImageReferenceToUser() {
    this.dataService.postData(`users/${this.user.userId}/update-photo`, this.imageObject).subscribe({
      next: () => {
        console.log('Profile photo updated in user data');
        this.popupService.popup("success", "Profile image saved successfully!", 3000);
      },
      error: (err) => {
        console.error('Failed to save image to profile', err);
        this.popupService.popup("error", "Failed to save image", 3000);
      }
    });
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
