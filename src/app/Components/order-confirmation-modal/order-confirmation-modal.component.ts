import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

@Component({
  selector: 'app-order-confirmation-modal',
  templateUrl: './order-confirmation-modal.component.html',
  styleUrls: ['./order-confirmation-modal.component.css']
})
export class OrderConfirmationModalComponent {
  orderItems: OrderItem[];
  totalPrice: number;
  preparationDate: string = '';
  alertMessage: string = '';

  constructor(
    public dialogRef: MatDialogRef<OrderConfirmationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.orderItems = data.orderItems || [];
    this.totalPrice = data.totalPrice || 0;
  }

  changeQuantity(item: OrderItem, change: number): void {
    if (item.quantity + change >= 0) {
      item.quantity += change;
      this.totalPrice = this.calculateTotalPrice();
    }
  }

  calculateTotalPrice(): number {
    return this.orderItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  confirmOrder(): void {
    if (!this.preparationDate) {
      this.alertMessage = 'Please select a preparation date and time.';
      return;
    }
    this.dialogRef.close({
      confirmed: true,
      preparationDate: this.preparationDate
    });
  }

  cancelOrder(): void {
    this.dialogRef.close({ confirmed: false });
  }
}
