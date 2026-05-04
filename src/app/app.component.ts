import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showAuthModal = true;

  links = [
    { title: 'Home', link: '/' },
    { title: 'Menu', link: '/menu' },
    { title: 'About', link: '/about' },
    { title: 'Contact', link: '/contact' }
  ];

  openAuthModal() {
    this.showAuthModal = true;
  }

  closeAuthModal(success: boolean) {
    this.showAuthModal = false;
  }
}
