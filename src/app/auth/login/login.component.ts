import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { PopupService } from 'src/app/services/popup.service';
import { environment } from 'src/environments/environment';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private router: Router,
    private popUp: PopupService) { }


  loginForm!: FormGroup;
  @ViewChild('captchaContainer', { static: false }) dataContainer!: ElementRef;
  public captchaKey: any = environment.CAPTCHA_SECRET_KEY;
  public passwordKey: any = environment.PASSWORD_SECRET_KEY;
  public txtCaptcha: any = '';
  public generatedCaptcha: any = "";

  ngOnInit(): void {
    this.createForm();
    this.getCaptcha();
  }

  createForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      captcha: ['', Validators.required]
    });
  }

  getCaptcha() {
    this.dataService.getData('captcha').subscribe((res: any) => {
      this.dataContainer.nativeElement.innerHTML = res.data;
      this.generatedCaptcha = res.text;
    });
  }

  login() {
    if (!this.loginForm.invalid) {
      let txtCaptcha = this.generatedCaptcha;

      // Check if entered captcha matches generated captcha
      if (this.loginForm.value.captcha !== txtCaptcha) {
        this.popUp.popup("error", "Wrong Captcha try again", 5000);
        return;
      }

      // Encrypt the password before sending it
      const password = CryptoJS.AES.encrypt(this.loginForm.value.password, this.passwordKey).toString();
      this.loginForm.patchValue({ password: password });

      this.dataService.postData('login', this.loginForm.value).subscribe(
        (res: any) => {
          console.log("Response:", res);

          if (res.error) {
            this.popUp.popup("error", res.error.error || "Login failed try again", 5000);
          } else if (res.data) {
            console.log("res:", res);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('userData', JSON.stringify(res.data));
            this.popUp.popup("success", res.message || "Login successfully done", 5000);

            switch (res.data['role']) {
              case "admin":
                this.router.navigate(['/admin']);
                break;
              case "user":
                this.router.navigate(['/']);
                break;
              default:
                this.popUp.popup("error", "Login failed please check username or password", 5000);
                break;
            }
          }
        },
        (error) => {
          console.error("Login API Error:", error);
          this.popUp.popup("error", error?.error?.error || "Server error try again latter", 5000);
        }
      );
    } else {
      console.log("Form is invalid");
    }
  }


}
