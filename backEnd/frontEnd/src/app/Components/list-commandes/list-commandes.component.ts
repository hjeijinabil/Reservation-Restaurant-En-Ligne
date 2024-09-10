import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommandeService } from 'src/app/Services/commande.service';
import { OrderService } from 'src/app/Services/order.service';
// Déclarez ou importez l'interface Order
export interface Order {
  id: number; // Make id optional to handle cases where it might be undefined
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
  selector: 'app-list-commandes',
  templateUrl: './list-commandes.component.html',
  styleUrls: ['./list-commandes.component.css']
})
export class ListCommandesComponent  implements OnInit {
  orders: Order[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.orderService.getOrders().subscribe(
      (orders: Order[]) => {
        this.orders = orders;
      },
      (error) => console.error('Error loading orders:', error)
    );
  }

  deleteOrder(orderId: number): void {
    this.orderService.deleteOrder(orderId).subscribe(() => {
      this.orders = this.orders.filter(order => order.id !== orderId);
    });
  }
  updateOrderStatus(orderId: number, newStatus: string): void {
    this.orderService.updateOrderStatus(orderId, newStatus).subscribe(
      () => {
        this.loadOrders(); // Reload orders after updating status
      },
      (error: any) => { // Explicitly defining error type
        console.error('Error updating order status:', error);
      }
    );
  }
}

