import { Component } from '@angular/core';
import { faEye } from '@fortawesome/free-solid-svg-icons';  // Import the icon


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  faEye = faEye
}
