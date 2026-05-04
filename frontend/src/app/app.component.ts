import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './components/shared/header/header.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { AuthModalComponent } from './components/auth/auth-modal/auth-modal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, HeaderComponent, FooterComponent, AuthModalComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showAuthModal = false;

  constructor() {
    // Listen for open-auth-modal events from components
    window.addEventListener('open-auth-modal', () => {
      this.openAuthModal();
    });
  }

  openAuthModal() {
    this.showAuthModal = true;
  }

  closeAuthModal(success: boolean) {
    this.showAuthModal = false;
  }
}
