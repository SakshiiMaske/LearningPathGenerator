import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  searchQuery = '';
  showDropdown = false;

  careers = ['Java Developer', 'Frontend Developer', 'Data Analyst', 'Python Developer'];
  filteredCareers = [...this.careers];

  selectedCareer = '';
  loading = false;

  // Popup flag
  showAuthPopup = false;
  showCareerPopup = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  filterSuggestions() {
    this.filteredCareers = this.careers.filter(c =>
      c.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  selectCareer(career: string) {
    this.selectedCareer = career;
    this.searchQuery = career;
    this.showDropdown = false;
  }

  goToLearningPath() {

  if (!this.authService.isLoggedIn()) {
    this.showAuthPopup = true;
    return;
  }

  // Career validation popup
  if (!this.selectedCareer && !this.searchQuery.trim()) {
    this.showCareerPopup = true;
    return;
  }

  const careerToSend = this.selectedCareer || this.searchQuery;

  this.loading = true;

  setTimeout(() => {
    this.loading = false;

    this.router.navigate(['/learning-path'], {
      queryParams: { career: careerToSend }
    });
  }, 1600);
}

  closePopup() {
    this.showAuthPopup = false;
  }
}
