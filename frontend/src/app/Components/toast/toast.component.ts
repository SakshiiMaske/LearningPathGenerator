import { Component, OnInit } from '@angular/core';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
})
export class ToastComponent implements OnInit {

  show = false;
  message = '';
  type: 'success' | 'error' = 'success';

  constructor(private toastService: ToastService) {}

  ngOnInit(): void {
    this.toastService.toastState.subscribe((toast) => {
      this.message = toast.message;
      this.type = toast.type;
      this.show = true;

      setTimeout(() => {
        this.show = false;
      }, 2500);
    });
  }
}
