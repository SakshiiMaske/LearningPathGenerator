import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LearningPath } from 'src/app/Models/learning-path.model';
import { AiService } from 'src/app/services/ai.service';
import { ProfileService } from 'src/app/services/profile.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-learning-path',
  templateUrl: './learning-path.component.html',
  styleUrls: ['./learning-path.component.css'],
})
export class LearningPathComponent implements OnInit {
  career: string = '';
  loading = false;
  error = '';
  learningPath: LearningPath | null = null;
  showSavePopup = false;

  constructor(
    private route: ActivatedRoute,
    private aiService: AiService,
    private profileService: ProfileService,
    private toastService: ToastService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.career = params['career'];
      if (this.career) this.loadLearningPath();
    });
  }

  get hasResources() {
    return !!this.learningPath?.resources;
  }

  get hasYouTube() {
    return !!this.learningPath?.resources?.youtubeVideos?.length;
  }

  get hasCourses() {
    return !!this.learningPath?.resources?.courses?.length;
  }

  get hasDocs() {
    return !!this.learningPath?.resources?.documentation;
  }

  get hasSteps() {
    return !!this.learningPath?.steps?.length;
  }

  /** Fetch Learning Path From Backend */
  loadLearningPath() {
    this.loading = true;
    this.error = '';
    this.learningPath = null;

    this.aiService.generateLearningPath(this.career).subscribe({
      next: (response) => {
        try {
          const parsed = JSON.parse(response);

          // Validate keys
          if (!parsed.steps || !Array.isArray(parsed.steps)) {
            throw new Error('AI missing steps array.');
          }

          // Ensure resources object exists — prevents HTML crash
          parsed.resources = parsed.resources || {
            youtubeVideos: [],
            documentation: null,
            courses: [],
          };

          if (!parsed.resources.youtubeVideos)
            parsed.resources.youtubeVideos = [];
          if (!parsed.resources.courses) parsed.resources.courses = [];
          if (!parsed.resources.documentation) {
            parsed.resources.documentation = { title: '', url: '' };
          }

          this.learningPath = parsed;
        } catch (err) {
          console.error(err);
          this.error = 'Invalid JSON response received from AI.';
        }

        this.loading = false;
      },

      error: () => {
        this.error = 'Error connecting to server.';
        this.loading = false;
      },
    });
  }

  /** Regenerate */
  onRegenerate() {
    this.loadLearningPath();
  }

  /** Download PDF */
  onDownloadPDF() {
    window.print();
  }

  /** Save Path */
  onSaveToProfile() {
    if (!this.learningPath) {
      this.toastService.showError('No learning path found.');
      return;
    }

    const payload = {
      pathName: this.learningPath.goal || 'Learning Path',
      learningPath: this.learningPath,
    };

    this.profileService.savePath(payload).subscribe({
      next: () => {
        this.showSavePopup = true;
        this.toastService.showSuccess('Learning path saved successfully!');
      },
      error: () => {
        this.toastService.showError('Failed to save learning path.');
      },
    });
  }

  /** Popup Close */
  closeSavePopup() {
    this.showSavePopup = false;
  }

  /** Navigate to Saved Paths */
  goToSavedPaths() {
    this.showSavePopup = false;
    this.router.navigate(['/saved-paths']);
  }
}
