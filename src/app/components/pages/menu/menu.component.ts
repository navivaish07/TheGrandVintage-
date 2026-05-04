import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  categories = [
    {
      name: 'Starters',
      items: ['Royal Soup', 'Vintage Salad', 'Crispy Rolls']
    },
    {
      name: 'Main Course',
      items: ['Maharaja Thali', 'Butter Chicken', 'Paneer Nawabi']
    },
    {
      name: 'Desserts',
      items: ['Rasgulla Royale', 'Vintage Gulab Jamun', 'Shahi Kulfi']
    },
    {
      name: 'Drinks',
      items: ['Royal Lassi', 'Vintage Mocktail', 'Classic Wine']
    }
  ];
}
