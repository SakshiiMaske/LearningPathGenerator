import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgressService {

  private BASE_URL = 'http://localhost:8080/progress';

  constructor(private http: HttpClient) {}

  saveProgress(pathId: string, progressState: any): Observable<any> {
    return this.http.post(`${this.BASE_URL}/${pathId}`, progressState);
  }

  getProgress(pathId: string): Observable<any> {
    return this.http.get(`${this.BASE_URL}/${pathId}`);
  }
}
