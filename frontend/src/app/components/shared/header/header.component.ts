import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() openAuth = new EventEmitter<void>();
  isAuthenticated = false;
  isAdmin = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.checkAuthStatus();
    // Listen for auth changes
    window.addEventListener('auth-changed', () => {
      this.checkAuthStatus();
    });
  }

  ngOnDestroy() {
    // Clean up event listener
    window.removeEventListener('auth-changed', () => {
      this.checkAuthStatus();
    });
  }

  checkAuthStatus() {
    this.isAuthenticated = this.authService.isAuthenticated();
    this.isAdmin = this.authService.isAdminUser();
  }

  logout() {
    this.authService.logout();
    this.checkAuthStatus();
  }
}
