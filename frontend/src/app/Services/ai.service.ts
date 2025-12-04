import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AiService {

  private apiUrl = 'http://localhost:8080/api/ai/generate';

  constructor(private http: HttpClient) { }

  generateLearningPath(career: string): Observable<string> {
    return this.http.post(this.apiUrl, { career }, { responseType: 'text' });
  }
}
