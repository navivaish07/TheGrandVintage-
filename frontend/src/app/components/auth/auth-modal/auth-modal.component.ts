import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // ✅ Needed for ngModel
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.scss']
})
export class AuthModalComponent {
  @Output() close = new EventEmitter<boolean>();

  showLogin = true;

  loginData = { email: '', password: '' };
  signupData = { email: '', password: '', confirm: '' };

  constructor(private authService: AuthService, private router: Router) {}

  toggle(tab: string) { this.showLogin = tab === 'login'; }

  closeModal() { this.close.emit(false); }

  signIn() {
    this.authService.login(this.loginData.email, this.loginData.password).subscribe({
      next: (response) => {
        if (response.isAdmin) {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/home']);
        }
        this.close.emit(true);
        // Trigger header update by dispatching a custom event
        window.dispatchEvent(new CustomEvent('auth-changed'));
      },
      error: () => {
        alert('Invalid credentials!');
      }
    });
  }

  signUp() {
    if (this.signupData.password !== this.signupData.confirm) {
      alert('Passwords do not match!');
      return;
    }
    this.authService.signup(this.signupData.email, this.signupData.password).subscribe({
      next: () => {
        alert('Account created successfully! Please log in.');
        this.showLogin = true;
        // Trigger header update by dispatching a custom event
        window.dispatchEvent(new CustomEvent('auth-changed'));
      },
      error: (err) => {
        alert(err.error.message || 'Signup failed!');
      }
    });
  }
}
