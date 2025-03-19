import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  constructor() { }
  
  popup(icon: any, text: string, timer: number) {
    Swal.fire({
      icon: icon,
      text: text,
      timer: timer
    });
  }
}
