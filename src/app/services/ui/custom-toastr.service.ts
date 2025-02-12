import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class CustomToastrService {
  constructor(private toaster: ToastrService) {}
  message(
    message: string,
    title: string,
    messageType: ToastrMessageType,
    position: ToastrPosition
  ) {
    this.toaster[messageType](message, title, {
      positionClass: position,
    });
  }
}
export enum ToastrMessageType {
  Success = 'success',
  Error = 'error',
  Warning = 'warning',
  Info = 'info',
}
export enum ToastrPosition {
  TopRight = 'toast-top-right',
  BottomRight = 'toast-bottom-right',
  TopLeft = 'toast-top-left',
  TopFullWidth = 'toast-top-full-width',
  TopCenter = 'toast-top-center',
  BottomFullWidth = 'toast-bottom-full-width',
  BottomCenter = 'toast-bottom-center',
  BottomLeft = 'toast-bottom-left',
}
