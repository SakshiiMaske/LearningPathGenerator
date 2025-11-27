import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-saved-paths',
  templateUrl: './saved-paths.component.html',
  styleUrls: ['./saved-paths.component.css']
})
export class SavedPathsComponent implements OnInit {

  savedPaths: any[] = [];
  loading: boolean = true;

  constructor(private profileService: ProfileService, private router: Router) {}

  ngOnInit(): void {
    this.loadSavedPaths();
  }

  loadSavedPaths() {
    this.profileService.getSavedPaths().subscribe({
      next: (res: any) => {
        this.savedPaths = res;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        console.error("Error loading saved paths");
      }
    });
  }

  openProgress(pathId: string) {
    this.router.navigate(['/progress', pathId]);
  }
}
