import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(public authService: AuthService, private toastService: ToastService) {}
  logout() {
    this.authService.logout();
    this.toastService.showSuccess("Logged out successfully!");

  }
}
