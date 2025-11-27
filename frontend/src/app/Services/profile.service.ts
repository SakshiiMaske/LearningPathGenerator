import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private BASE_URL = 'http://localhost:8080/profile';

  constructor(private http: HttpClient) {}

  // Save a generated learning path
  savePath(payload: any): Observable<any> {
    return this.http.post(`${this.BASE_URL}/save`, payload);
  }

  // Get all saved learning paths
  getSavedPaths(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/paths`);
  }

  // Get specific saved path
  getSavedPath(pathId: string): Observable<any> {
    return this.http.get(`${this.BASE_URL}/paths/${pathId}`);
  }
}
