import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  // Define the type of menu items
  items = [
    { name: 'Coffee', description: 'Hot coffee', price: 2.5, category: 'drinks', image: '../assets/images/layouts/54.jpg' },
    { name: 'Burger', description: 'Delicious beef burger', price: 5.0, category: 'lunch', image: '../assets/images/layouts/54.jpg' },
    { name: 'Pasta', description: 'Creamy pasta', price: 7.0, category: 'dinner', image: '../assets/images/layouts/54.jpg' },
    { name: 'Pasta', description: 'Creamy pasta', price: 7.0, category: 'dinner', image: '../assets/images/layouts/54.jpg' },
    { name: 'Pasta', description: 'Creamy pasta', price: 7.0, category: 'dinner', image: '../assets/images/layouts/54.jpg' },
    { name: 'Pasta', description: 'Creamy pasta', price: 7.0, category: 'dinner', image: '../assets/images/layouts/54.jpg' },
    // Add more items as needed
  ];

  filteredItems = this.items;

  constructor() {}

  ngOnInit(): void {
    // Initial setup if needed
  }

  filterItems(category: string): void {
    if (category === 'all') {
      this.filteredItems = this.items;
    } else {
      this.filteredItems = this.items.filter(item => item.category === category);
    }
  }
}
