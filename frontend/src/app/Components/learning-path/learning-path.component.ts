import { Component, OnInit } from '@angular/core';

interface Step {
  id: number;
  title: string;
  bullets: string[];
  duration?: string;
}

@Component({
  selector: 'app-learning-path',
  templateUrl: './learning-path.component.html',
  styleUrls: ['./learning-path.component.css']
})
export class LearningPathComponent implements OnInit {
  goal = 'Java Developer';
  estimated = '8–12 Weeks';

  steps: Step[] = [
    {
      id: 1,
      title: 'Core Java Basics',
      bullets: ['Variables, Loops, Datatypes', 'OOP Concepts'],
      duration: '7–10 days'
    },
    {
      id: 2,
      title: 'Collections + OOP Advanced',
      bullets: ['List, Set, Map', 'Exception Handling'],
      duration: '10–12 days'
    },
    {
      id: 3,
      title: 'SQL Fundamentals',
      bullets: ['Joins, Queries', 'Normalization'],
      duration: '7 days'
    },
    {
      id: 4,
      title: 'Git + GitHub',
      bullets: ['Branching, Pull Requests'],
      duration: '3 days'
    },
    {
      id: 5,
      title: 'Spring Boot Basics',
      bullets: ['REST API', 'Dependency Injection'],
      duration: '14 days'
    },
    {
      id: 6,
      title: 'Mini Project',
      bullets: ['Build a CRUD API using Java + Spring Boot']
    }
  ];

  constructor() {}

  ngOnInit(): void {}

  // Simple "Download PDF" fallback: opens print dialog for the printable card.
  // Replace with jsPDF/html2canvas if you want a file instead.
  onDownloadPDF() {
    // Add a small CSS class to make the card print-friendly if desired.
    window.print();
  }

  // Simulated save: you would call your backend API to persist.
  onSaveToProfile() {
    // Placeholder: call your API here
    alert('Learning Path saved to your profile (placeholder).');
  }

  // Regenerate (mock): shuffle durations or reset — adapt to your generator.
  onRegenerate() {
    // Example: rotate steps array (simple visual regenerate)
    this.steps = [...this.steps.slice(1), this.steps[0]];
  }
}
