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
  constructor(private router: Router) {}

  careers = [
    'Java Developer',
    'Data Analyst',
    'DevOps Engineer',
    'AI Engineer',
    'Cloud Architect',
    'Frontend Developer',
    'Backend Developer',
    'Full Stack Developer'
  ];

  filteredCareers = [...this.careers];

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  filterSuggestions() {
  const query = this.searchQuery.toLowerCase();
  this.filteredCareers = this.careers.filter(c =>
    c.toLowerCase().includes(query)
  );

  this.showDropdown = true;
}

  selectCareer(career: string) {
    this.searchQuery = career;
    this.showDropdown = false;
  }

  onGeneratePath() {
    this.router.navigate(['/learning-path']);
  }

}
