import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';
import { ProgressService } from 'src/app/services/progress.service';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html'
})
export class ProgressComponent implements OnInit {

  pathId: string = '';
  learningPath: any;
  progressState: { [key: string]: boolean } = {};
  progressPercent: number = 0;

  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private profileService: ProfileService,
    private progressService: ProgressService
  ) {}

  ngOnInit(): void {
    this.pathId = this.route.snapshot.params['pathId'];
    this.loadSavedPath();
  }

  loadSavedPath() {
    this.profileService.getSavedPath(this.pathId).subscribe({
      next: (res) => {
        this.learningPath = res.learningPath;
        this.initializeProgress();
        this.loadProgressFromDb();
      },
      error: () => {
        console.error("Failed to load learning path");
      }
    });
  }

  initializeProgress() {
    this.learningPath.steps.forEach((step: any) => {
      step.bullets.forEach((topic: any, index: number) => {
        const key = `${step.id}-${index}`;
        if (!(key in this.progressState)) {
          this.progressState[key] = false;
        }
      });
    });

    this.updateProgressPercent();
  }

  loadProgressFromDb() {
    this.progressService.getProgress(this.pathId).subscribe({
      next: (res) => {
        if (res?.progressState) {
          this.progressState = res.progressState;
          this.updateProgressPercent();
        }
        this.loading = false;
      },
      error: () => {
        console.log("No existing progress found");
        this.loading = false;
      }
    });
  }

  toggleProgress(key: string) {
    this.progressState[key] = !this.progressState[key];
    this.updateProgressPercent();
    this.saveProgress();
  }

  updateProgressPercent() {
    const total = Object.keys(this.progressState).length;
    const completed = Object.values(this.progressState).filter(v => v).length;

    this.progressPercent = Math.round((completed / total) * 100);
  }

  saveProgress() {
    this.progressService.saveProgress(this.pathId, this.progressState).subscribe({
      next: () => console.log("Progress saved"),
      error: () => console.error("Failed to save progress")
    });
  }
}
