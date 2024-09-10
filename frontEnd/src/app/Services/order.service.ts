import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

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

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private baseUrl = 'http://localhost:8087/commandes';

  constructor(private http: HttpClient) {}

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.baseUrl);
  }
  updateOrderStatus(orderId: number, newStatus: string): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${orderId}`, { status: newStatus });
  }
  deleteOrder(orderId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${orderId}`);
  }
}
