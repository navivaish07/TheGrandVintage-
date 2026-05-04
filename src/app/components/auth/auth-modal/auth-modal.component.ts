import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // ✅ Needed for ngModel

@Component({
  selector: 'app-auth-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.scss']
})
export class AuthModalComponent {
  showLogin = true;

  loginData = { email: '', password: '' };
  signupData = { name: '', email: '', password: '', confirm: '' };

  toggle(tab: string) { this.showLogin = tab === 'login'; }

  closeModal() { console.log('Modal closed'); }

  signIn() { console.log(this.loginData); }

  signUp() {
    if (this.signupData.password !== this.signupData.confirm) {
      alert('Passwords do not match!');
      return;
    }
    console.log(this.signupData);
  }
}
