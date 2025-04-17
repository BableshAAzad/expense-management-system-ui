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
  baseUrlForFile = environment.rootUrl_for_file

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

    // Clear any previously uploaded image data
    this.imageObject = { url: '', id: '' };
    this.selectedImageUrl = null;

    const formData = new FormData();
    formData.append('file', file);

    this.dataService.postDataForFile(`add-image?folderName=user`, formData).subscribe({
      next: (res: any) => {
        if (res?.url) {
          this.imageObject = res;
          this.selectedImageUrl = `${environment.rootUrl_for_file}${res.url}`;
        } else {
          console.warn("Upload succeeded but no URL returned.");
        }
      },
      error: (err) => {
        console.error('Failed to upload photo', err);
        this.popupService.popup("error", err?.error?.error || err?.error || "Failed to upload photo", 3000);
      }
    });
  }

  saveImageReferenceToUser() {
    if (!this.imageObject || !this.imageObject.url) {
      this.popupService.popup("error", "No image selected to save", 3000);
      return;
    }

    this.dataService.postData(`users/${this.user.userId}/update-photo`, this.imageObject).subscribe({
      next: (res: any) => {
        this.popupService.popup("success", res?.message || "Profile image saved successfully!", 3000);
      },
      error: (err) => {
        console.error('Failed to save image to profile', err);
        this.popupService.popup("error", err?.error || "Failed to save image", 3000);
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
