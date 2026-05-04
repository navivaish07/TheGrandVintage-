import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService, MenuItem } from '../../../services/data.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  menuItems: MenuItem[] = [];
  categories: { name: string; items: MenuItem[] }[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.loadMenuItems();
  }

  loadMenuItems() {
    this.dataService.getMenuItems().subscribe(items => {
      this.menuItems = items;
      this.groupItemsByCategory();
    });
  }

  groupItemsByCategory() {
    const categoryMap = new Map<string, MenuItem[]>();
    this.menuItems.forEach(item => {
      if (!categoryMap.has(item.category)) {
        categoryMap.set(item.category, []);
      }
      categoryMap.get(item.category)!.push(item);
    });
    this.categories = Array.from(categoryMap.entries()).map(([name, items]) => ({ name, items }));
  }
}
