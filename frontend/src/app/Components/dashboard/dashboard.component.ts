import { Component } from '@angular/core';
import { Router } from '@angular/router';

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
  loading = false;   // <-- NEW

  constructor(private router: Router) {}

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
    if (!this.selectedCareer && !this.searchQuery.trim()) {
      alert("Please enter or select a career.");
      return;
    }

    const careerToSend = this.selectedCareer || this.searchQuery;

    // 👉 Start loading animation
    this.loading = true;

    // 👉 Add a small delay to SHOW the animation before navigating
    setTimeout(() => {
      this.loading = false;

      this.router.navigate(['/learning-path'], {
        queryParams: { career: careerToSend }
      });
    }, 1600);  // PERFECT smooth duration
  }
}
