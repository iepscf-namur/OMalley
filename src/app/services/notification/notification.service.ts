import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  timeOut = 5000;
  tapToDismiss = true;

  constructor(private toastr: ToastrService) { }

  showSuccess(message, title) {
      this.toastr.success(message, title, { timeOut: this.timeOut, tapToDismiss: this.tapToDismiss} )
  }

  showError(message, title) {
      this.toastr.success(message, title, { timeOut: this.timeOut, tapToDismiss: this.tapToDismiss} )
  }

  showInfo(message, title) {
      this.toastr.success(message, title, { timeOut: this.timeOut, tapToDismiss: this.tapToDismiss} )
  }

  showWarining(message, title) {
      this.toastr.success(message, title, { timeOut: this.timeOut, tapToDismiss: this.tapToDismiss} )
  }

}
