import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommandeService } from 'src/app/Services/commande.service';
// Déclarez ou importez l'interface Order
export interface Order {
  id: number;
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

  constructor(private orderService: CommandeService) {}

  ngOnInit(): void {
    this.orderService.getOrders().subscribe((orders) => {
      this.orders = orders;
    });
  }

  deleteOrder(orderId: number): void {
    this.orderService.deleteOrder(orderId).subscribe(() => {
      this.orders = this.orders.filter(order => order.id !== orderId);
    });
  }
  updateOrderStatus(orderId: number, newStatus: string): void {
    this.orderService.updateOrderStatus(orderId, newStatus).subscribe(() => {
      const order = this.orders.find(o => o.id === orderId);
      if (order) {
        order.status = newStatus;
      }
    });
  }
}

