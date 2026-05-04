import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // ✅ Import this for *ngFor, *ngIf, etc.

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule], // ✅ Add it here
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  story = `
    At The Grand Vintage, we believe dining is more than just food – it’s an experience.
    Established with a vision to blend royal flavors with modern elegance, we bring 
    to your table a celebration of taste, tradition, and hospitality.`;
  
  highlights = [
    { icon: "🏰", text: "Royal Ambience" },
    { icon: "🍴", text: "Multi-Cuisine Excellence" },
    { icon: "⭐", text: "Top Rated Service" },
    { icon: "🌿", text: "Fresh & Organic Ingredients" }
  ];
}
