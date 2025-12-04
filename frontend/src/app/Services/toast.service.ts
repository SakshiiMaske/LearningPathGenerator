import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toastSubject = new Subject<{
    message: string;
    type: 'success' | 'error';
  }>();
  toastState = this.toastSubject.asObservable();

  showSuccess(msg: string) {
    this.toastSubject.next({ message: msg, type: 'success' });
  }

  showError(msg: string) {
    this.toastSubject.next({ message: msg, type: 'error' });
  }
}
