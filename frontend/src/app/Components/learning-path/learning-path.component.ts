import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AiService } from 'src/app/services/ai.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-learning-path',
  templateUrl: './learning-path.component.html',
  styleUrls: ['./learning-path.component.css']
})
export class LearningPathComponent implements OnInit {

  career: string = '';
  loading = false;
  error = '';
  learningPath: any = null;
  

  constructor(
    private route: ActivatedRoute,
    private aiService: AiService,
    private profileService: ProfileService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Read `career` from query params when navigating from Dashboard
    this.route.queryParams.subscribe(params => {
      this.career = params['career'];

      if (this.career) {
        this.loadLearningPath();
      }
    });
  }

  /** CALL AI BACKEND AUTOMATICALLY */
  loadLearningPath() {
    this.loading = true;
    this.error = '';
    this.learningPath = null;

    this.aiService.generateLearningPath(this.career).subscribe({
      next: (response) => {
        try {
          // Backend returns plain text JSON — parse it
          this.learningPath = JSON.parse(response);
        } catch (e) {
          this.error = 'Invalid JSON response received from AI.';
        }
        this.loading = false;
      },
      error: () => {
        this.error = 'Error connecting to server.';
        this.loading = false;
      }
    });
  }

  /** RE-GENERATE LEARNING PATH AGAIN */
  onRegenerate() {
    this.loadLearningPath();   // Call backend again
  }

  /** DOWNLOAD PDF */
  onDownloadPDF() {
    window.print(); // simple print to PDF
  }

  /** SAVE OR BOOKMARK (FUTURE FEATURE) */
  onSaveToProfile() {

    if (!this.learningPath) {
      console.error("No learning path found!");
      return;
    }

    const payload = {
      pathName: this.learningPath.goal || 'Learning Path',
      learningPath: this.learningPath
    };

    this.profileService.savePath(payload).subscribe({
      next: () => {
        alert("Learning Path saved successfully!");
        this.router.navigate(['/saved-paths']);
      },
      error: (err) => {
        console.error("Error saving path:", err);
        alert("Failed to save learning path.");
      }
    });
  }
}
