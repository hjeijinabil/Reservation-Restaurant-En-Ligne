import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// Déclarez ou importez l'interface Order
export interface Order {
  id?: number;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  orderDate: string;
  orderTime: string;
  status: string;
  totalAmount: number ;
  preparationDate?: string;
}
@Injectable({
  providedIn: 'root'
})
export class CommandeService {

  private baseUrl = 'http://localhost:8087/commandes';

  constructor(private http: HttpClient) {}

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.baseUrl);
  }
  updateOrderStatus(orderId: number, status: string): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${orderId}/complete`, {});
  }
  deleteOrder(orderId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${orderId}`);
  }

  // Check if a user is authenticated
  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token; // Returns true if a token exists, otherwise false
  }

  // Method to place a new order
  placeOrder(order: Order | undefined): Observable<Order> {
    return this.http.post<Order>(this.baseUrl, order);
  }
}