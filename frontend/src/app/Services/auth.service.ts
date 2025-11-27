import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private BASE_URL = 'http://localhost:8080/auth';  // Your backend URL

  constructor(private http: HttpClient) {}

  // Register
  register(payload: any): Observable<any> {
    return this.http.post(`${this.BASE_URL}/register`, payload);
  }

  // Login
  login(payload: any): Observable<any> {
    return this.http.post(`${this.BASE_URL}/login`, payload);
  }

  // Check if logged in
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  // Logout
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  }

  // Get stored token
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Get userId
  getUserId(): string | null {
    return localStorage.getItem('userId');
  }
}
