import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { PopupService } from './popup.service';
import { DataService } from './data.service';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UpdateUserService {
  public passwordKey: any = environment.PASSWORD_SECRET_KEY;

  constructor(
    private dataService: DataService,
    private popUpService: PopupService,
  ) {}

  handleUpdateUser(url: string, updatedUserData: any): Observable<any> {
    let updatedUserObject: any = {
      email: updatedUserData.email
    };

    if (updatedUserData.password) {
      const password = CryptoJS.AES.encrypt(updatedUserData.password, this.passwordKey).toString();
      updatedUserObject.password = password;
    }

    return this.dataService.putData(url, updatedUserObject);
  }

  updateUser(icon: any, text: string, user: any): Observable<any> {
    return new Observable(observer => {
      Swal.fire({
        title: "<span class='text-purple-700'>Edit User Data</span>",
        html: `
        <form id="swal-update-form">
          <input id="swal-input-email" type="email" class="swal2-input" value="${user.email}" placeholder="Enter email" autocomplete>
          <input id="swal-input-password" type="password" class="swal2-input" placeholder="New password" autocomplete>
        </form>
        `,
        showDenyButton: true,
        denyButtonText: 'Update',
        confirmButtonText: 'Cancel',
        confirmButtonColor: "#951a8e",
        denyButtonColor: "#86951a",
        focusConfirm: false,
        width: 600,
        padding: "3em",
        color: "#fff",
        background: "linear-gradient(to right, rgba(225, 215, 213, 0.8), rgba(0, 0, 255, 0.9))",
        backdrop: `rgba(0,0,123,0.4) left top no-repeat`,
        preDeny: () => {
          const email = (document.getElementById('swal-input-email') as HTMLInputElement).value;
          const password = (document.getElementById('swal-input-password') as HTMLInputElement).value;

          if (!email) {
            Swal.showValidationMessage('Please fill in email field');
            return false;
          }

          const updatedUserData = {
            email: email.trim(),
            password: password.trim()
          };

          this.handleUpdateUser(`users/${user.userId}`, updatedUserData).subscribe(
            (res: any) => {
              if (res.error) {
                this.popUpService.popup("error", res.error.error || "Update failed", 5000);
                observer.error(res.error);
              } else {
                this.popUpService.popup("success", res.message || "User updated", 5000);
                observer.next(res);
                observer.complete();
              }
            },
            (err) => {
              this.popUpService.popup("error", err.error?.error || "Server error", 5000);
              observer.error(err);
            }
          );

          return false; // prevents auto-close
        }
      }).then(result => {
        if (result.isConfirmed) {
          observer.complete(); // User cancelled
        }
      });
    });
  }
}
