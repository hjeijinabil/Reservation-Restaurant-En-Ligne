import { Component, OnInit } from '@angular/core';
import { AddProductService } from 'src/app/Services/add-product.service';
import { CommandeService } from 'src/app/Services/commande.service';
import { Router } from '@angular/router';

export interface Order {
  id?: number;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  orderDate: string;
  orderTime: string;
  status: string;
  totalAmount: number;
  orderItems: string[];
}
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  orders: Order[] = [];
  newOrder: Order = {
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    orderDate: '',
    orderTime: '',
    status: '',
    totalAmount: 0,
    orderItems: []
  };
  selectedOrder: Order | null = null;

  cart: { [key: string]: number } = {}; // Object to hold the quantity of each item
  totalPrice: number = 0;
  items: any[] = [];
  filteredItems: any[] = [];
  selectedCategory: string = 'all'; // Track the selected category

  constructor(private productService: AddProductService, private orderService: CommandeService, private router: Router) {}

  ngOnInit(): void {
    this.loadMenuItems();
  }

  loadMenuItems(category: string = 'all'): void {
    this.productService.getMenuItems(category).subscribe(
      (items) => {
        console.log('Loaded items:', items);
        this.filteredItems = items;
        this.selectedCategory = category; // Set the selected category
      },
      (error) => {
        console.error('Error loading menu items:', error);
      }
    );
  }

  filterItems(category: string): void {
    this.selectedCategory = category; // Update selected category
    this.loadMenuItems(category);
  }

  addToCart(item: any): void {
    if (this.cart[item.name]) {
      this.cart[item.name]++;
    } else {
      this.cart[item.name] = 1;
    }
    this.calculateTotal();
  }

  removeFromCart(item: any): void {
    if (this.cart[item.name]) {
      this.cart[item.name]--;
      if (this.cart[item.name] === 0) {
        delete this.cart[item.name];
      }
    }
    this.calculateTotal();
  }

  getItemQuantity(item: any): number {
    return this.cart[item.name] || 0;
  }

  calculateTotal(): void {
    this.totalPrice = Object.keys(this.cart).reduce((total, itemName) => {
      const item = this.filteredItems.find(i => i.name === itemName);
      return total + (item ? item.price * this.cart[itemName] : 0);
    }, 0);
  }

  processOrder(): void {
    // Check if the user is authenticated
    if (!this.orderService.isAuthenticated()) {
      // If not authenticated, redirect to the login page
      this.router.navigate(['/login']);
      return;
    }

    // Process the order if the user is authenticated
    this.newOrder.orderItems = Object.keys(this.cart); // Assuming orderItems are the keys of items in the cart
    this.newOrder.totalAmount = this.totalPrice;

    this.orderService.placeOrder(this.newOrder).subscribe(
      (order) => {
        console.log('Order placed successfully:', order);
        this.resetCart(); // Reset cart after placing the order
      },
      (error) => {
        console.error('Error placing order:', error);
      }
    );
  }

  resetCart(): void {
    this.cart = {};
    this.totalPrice = 0;
    this.newOrder = {
      clientName: '',
      clientEmail: '',
      clientPhone: '',
      orderDate: '',
      orderTime: '',
      status: '',
      totalAmount: 0,
      orderItems: []
    };
  }
}