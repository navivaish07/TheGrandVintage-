import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService, Review } from '../../../services/data.service';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {
  reviews: Review[] = [];
  newReview: Review = {
    name: '',
    rating: 0,
    feedback: ''
  };
  isAuthenticated = false;

  constructor(private dataService: DataService, private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.isAuthenticated = this.authService.isAuthenticated();
    this.loadReviews();

    // Listen for auth changes
    window.addEventListener('auth-changed', () => {
      this.isAuthenticated = this.authService.isAuthenticated();
    });
  }

  loadReviews() {
    this.dataService.getReviews().subscribe({
      next: (data) => this.reviews = data,
      error: () => console.error('Error loading reviews')
    });
  }

  setRating(rating: number) {
    this.newReview.rating = rating;
  }

  submitReview() {
    if (this.newReview.name && this.newReview.rating > 0 && this.newReview.feedback) {
      this.dataService.addReview(this.newReview).subscribe({
        next: () => {
          alert('Thank you for your review!');
          this.newReview = { name: '', rating: 0, feedback: '' };
          this.loadReviews(); // Refresh the reviews list
        },
        error: () => {
          alert('Error submitting review. Please try again.');
        }
      });
    }
  }

  openAuthModal() {
    // Emit event to open auth modal
    window.dispatchEvent(new CustomEvent('open-auth-modal'));
  }
}
