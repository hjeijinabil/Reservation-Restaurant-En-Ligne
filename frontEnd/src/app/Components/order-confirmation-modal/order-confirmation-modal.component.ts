import { Component, Inject, OnInit } from '@angular/core';
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
export class OrderConfirmationModalComponent implements OnInit {
  orderItems: OrderItem[];
  totalPrice: number;
  preparationTime: string = ''; // Time selected by the user
  preparationDate: string = ''; // Full date and time
  alertMessage: string = '';

  constructor(
    public dialogRef: MatDialogRef<OrderConfirmationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.orderItems = data.orderItems || [];
    this.totalPrice = data.totalPrice || 0;
  }

  ngOnInit(): void {
    this.setDefaultPreparationDate();
  }

  // Set today's date as default
  setDefaultPreparationDate(): void {
    const today = new Date();
    this.preparationDate = today.toISOString().slice(0, 10); // YYYY-MM-DD format
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
    if (!this.preparationTime) {
      this.alertMessage = 'Please select a preparation time.';
      return;
    }

    // Combine the default date with the selected time
    const preparationDateTime = `${this.preparationDate}T${this.preparationTime}:00`;

    this.dialogRef.close({
      confirmed: true,
      preparationDate: preparationDateTime
    });
  }

  cancelOrder(): void {
    this.dialogRef.close({ confirmed: false });
  }
}
