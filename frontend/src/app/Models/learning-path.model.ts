export interface LearningPath {
  goal: string;
  estimated: string;
  steps: {
    id: number;
    title: string;
    bullets: string[];
    duration: string;
  }[];

  resources: {
    youtubeVideos: { title: string; url: string }[];
    documentation: { title: string; url: string };
    courses: { title: string; url: string }[];
  };
}
