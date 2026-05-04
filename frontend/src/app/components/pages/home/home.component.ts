import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common'; // ✅ Required for *ngFor
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { DataService } from '../../../services/data.service';

interface Reservation {
  name: string;
  email: string;
  date: string;
  time: string;
  guests: number;
  message: string;
  table: string;
}

interface Contact {
  name: string;
  email: string;
  message: string;
}

interface Review {
  name: string;
  rating: number;
  feedback: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule], // ✅ Add CommonModule here
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  title = "Regal Feast";
  subtitle = "Savor Royalty";

  heroImages = [
    { src: 'assets/images/pani-puri.jpeg', alt: 'Pani Puri Delight' },
    { src: 'assets/images/thali-platter.jpeg', alt: 'Thali Platter Feast' }
  ];

  foodImages = [
    { src: 'assets/images/pani-puri.jpeg', alt: 'Roasted Chicken with Rice and Vegetables' },
    { src: 'assets/images/thali-platter.jpeg', alt: 'Shrimp with Naan' },
    { src: 'assets/images/indian-dishes.jpeg', alt: 'Grilled Fish Filet' },
    { src: 'assets/images/spices-dishes.jpeg', alt: 'Steak over Creamy Mash' },
    { src: 'assets/images/indian-meal.jpeg', alt: 'Chicken Rice Dish' },
    { src: 'assets/images/pani-puri.jpeg', alt: 'Pani Puri Delight' },
    { src: 'assets/images/thali-platter.jpeg', alt: 'Thali Platter Feast' },
    { src: 'assets/images/indian-dishes.jpeg', alt: 'Indian Dishes Variety' }
  ];

  navButtons = [
    { label: 'Menu', route: '/menu' },
    { label: 'Reservations', route: '/reservations' },
    { label: 'About Us', route: '/about' }
  ];

  isAdmin = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.checkAdminStatus();
    // Listen for auth changes
    window.addEventListener('auth-changed', () => {
      this.checkAdminStatus();
    });
  }

  ngOnDestroy() {
    // Clean up event listener
    window.removeEventListener('auth-changed', () => {
      this.checkAdminStatus();
    });
  }

  private checkAdminStatus() {
    this.isAdmin = this.authService.isAdminUser();
  }

  goToAdminPanel() {
    this.router.navigate(['/admin']);
  }
}
