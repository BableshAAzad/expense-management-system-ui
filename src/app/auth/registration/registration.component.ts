import { Component, ElementRef, ViewChild } from '@angular/core';
import { faEye } from '@fortawesome/free-solid-svg-icons';  // Import the icon
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { PopupService } from 'src/app/services/popup.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  faEye = faEye
  registrationForm!: FormGroup;
  public txtCaptcha: any = '';
  public generatedCaptcha: any = "";
  public captchaKey: any = environment.CAPTCHA_SECRET_KEY;
  public passwordKey: any = environment.PASSWORD_SECRET_KEY;
  @ViewChild('captchaContainer', { static: false }) dataContainer!: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private router: Router,
    private popUp: PopupService) { }


  ngOnInit(): void {
    this.createForm();
    this.getCaptcha();
  }

  createForm() {
    this.registrationForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      passwordConfirmation: ['', Validators.required],
      termAndCondition: ['', Validators.required],
      captcha: ['', Validators.required]
    });
  }

  getCaptcha() {
    this.dataService.getData('captcha').subscribe((res: any) => {
      this.dataContainer.nativeElement.innerHTML = res.data;
      this.generatedCaptcha = res.text;
    });
  }

  registration() {
    if (!this.registrationForm.invalid) {
      let txtCaptcha = this.generatedCaptcha; // Captcha text for validation

      // Check if entered captcha matches generated captcha
      if (this.registrationForm.value.captcha !== txtCaptcha) {
        this.popUp.popup("error", "Wrong Captcha try again", 5000);
        return;
      }

      if (this.registrationForm.value.password !== this.registrationForm.value.passwordConfirmation) {
        this.popUp.popup("error", "Password and confirm password is not match", 5000);
        return;
      }

      // Encrypt the password before sending it
      const password = CryptoJS.AES.encrypt(this.registrationForm.value.password, this.passwordKey).toString();
      const passwordConfirmation = CryptoJS.AES.encrypt(this.registrationForm.value.passwordConfirmation, this.passwordKey).toString();
      this.registrationForm.patchValue({ password, passwordConfirmation });

      this.dataService.postData('registration', this.registrationForm.value).subscribe(
        (res: any) => {
          console.log("Response:", res);

          if (res.error) {
            this.popUp.popup("error", "Registration Failed", 5000);
          } else {
            this.registrationForm.reset();
            this.popUp.popup("success", res.message, 5000);
          }
        },
        (error) => {
          console.error("Login API Error:", error);
          this.popUp.popup("error", error?.error?.error, 10000);
        }
      );
    } else {
      console.log("Form is invalid");
    }
  }



}
