import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

interface LoginResponse {
  token: string;
  isAdmin: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:4000/api';
  private token: string | null = null;
  private isAdmin = false;

  constructor(private http: HttpClient) {}

  signup(email: string, password: string, isAdmin: boolean = false): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, { email, password, isAdmin });
  }

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(response => {
        this.token = response.token;
        this.isAdmin = response.isAdmin;
        localStorage.setItem('token', this.token);
        localStorage.setItem('isAdmin', this.isAdmin.toString());
      })
    );
  }

  logout() {
    this.token = null;
    this.isAdmin = false;
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin');
  }

  isAuthenticated(): boolean {
    return !!this.token || !!localStorage.getItem('token');
  }

  isAdminUser(): boolean {
    return this.isAdmin || localStorage.getItem('isAdmin') === 'true';
  }

  getToken(): string | null {
    return this.token || localStorage.getItem('token');
  }
}
