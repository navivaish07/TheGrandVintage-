import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent {
  reviews = [
    {
      name: "Aarav Sharma",
      rating: 5,
      feedback: "An amazing dining experience! The food was delicious and the ambience was perfect."
    },
    {
      name: "Priya Desai",
      rating: 4,
      feedback: "Loved the menu variety. Service was excellent, just a little wait time."
    },
    {
      name: "Rahul Verma",
      rating: 5,
      feedback: "Best restaurant I’ve been to recently. Highly recommended!"
    }
  ];
}
