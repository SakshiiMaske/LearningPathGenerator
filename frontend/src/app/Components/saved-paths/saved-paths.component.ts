import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-saved-paths',
  templateUrl: './saved-paths.component.html',
})
export class SavedPathsComponent implements OnInit {
  savedPaths: any[] = [];
  loading: boolean = true;

  showDeleteModal = false;
  selectedPath: any = null;

  constructor(
    private profileService: ProfileService,
    private router: Router,
    private toast: ToastService
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
        console.error('Error loading saved paths');
      },
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
    this.profileService.deleteSavedPath(pathId).subscribe({
      next: () => {
        this.closeDeleteModal();
        this.loadSavedPaths();
      },
      error: () => console.error('Failed to delete path'),
    });
  }

  confirmDelete() {
    if (!this.selectedPath) return;

    this.profileService.deleteSavedPath(this.selectedPath.id).subscribe({
      next: () => {
        this.savedPaths = this.savedPaths.filter(
          (p) => p.id !== this.selectedPath!.id
        );
        this.closeDeleteModal();
        this.toast.showSuccess('Learning path deleted successfully!');
      },
      error: () => {
        this.toast.showError('Failed to delete learning path');
      },
    });
  }
}
