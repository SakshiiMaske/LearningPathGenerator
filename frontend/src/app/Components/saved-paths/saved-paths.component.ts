import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-saved-paths',
  templateUrl: './saved-paths.component.html'
})
export class SavedPathsComponent implements OnInit {

  savedPaths: any[] = [];
  loading: boolean = true;

  showDeleteModal = false;
  selectedPath: any = null;

  constructor(
    private profileService: ProfileService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadSavedPaths();
  }

  loadSavedPaths() {
    this.profileService.getSavedPaths().subscribe({
      next: (res) => {
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

  openDeleteModal(path: any) {
    this.selectedPath = path;
    this.showDeleteModal = true;
  }

  closeDeleteModal() {
    this.showDeleteModal = false;
    this.selectedPath = null;
  }

  deletePath(pathId: string) {
    console.log(pathId);
    
    this.profileService.deleteSavedPath(pathId).subscribe({
      next: () => {
        console.log("abc");
        
        this.savedPaths = this.savedPaths.filter(p => p.id !== pathId);
        console.log("gth");
        
        this.closeDeleteModal();
      },
      error: () => console.error("Failed to delete path")
    });
  }
}
