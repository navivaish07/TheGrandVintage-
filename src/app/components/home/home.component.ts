import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // ✅ Required for *ngFor

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule], // ✅ Import CommonModule here
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  title = "Welcome to The Grand Vintage"; // ✅ Make sure this exists

  highlights = [
    { icon: "🍲", text: "Wide variety of cuisines" },
    { icon: "⭐", text: "Top quality ingredients" },
    { icon: "👨‍🍳", text: "Expert chefs" },
    { icon: "💬", text: "Great customer reviews" }
  ];
}
