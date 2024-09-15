import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
export interface Order {
  id: number;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  orderDate: string; // Adjust the type based on your actual date format
  totalAmount: number;
  status: string;
  employée_id?: any; // Make sure this field matches the backend response
  // Add other fields as needed
}
@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:8087/commandes'; // Replace with actual API URL

  

  constructor(private http: HttpClient) {}

  // Fetch all orders
  getOrders(): Observable<Order[]> {
    
    return this.http.get<Order[]>(this.apiUrl);
  }

  // Delete an order by ID
  deleteOrder(orderId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${orderId}`);
  }

  // Update the status of an order
  updateOrderStatus(orderId: number, newStatus: string): Observable<void> {

    return this.http.put<void>(`${this.apiUrl}/${orderId}`, newStatus);
  }
  // Assign an employee to an order
  assignEmployeeToOrder(orderId: number, firstName: string): Observable<any> {
    console.log("rrrr", orderId,firstName);
    
    return this.http.put(`${this.apiUrl}/${orderId}/assign-employee`, { firstName });
  }
  
  // Method to place a new order
  placeOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(this.apiUrl, order);
  }
}
