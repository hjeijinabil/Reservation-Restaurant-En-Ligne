import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs'; // Import BehaviorSubject from rxjs
// Déclarez ou importez l'interface Order
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
export interface MenuItem {
  id: number;
  name: string;
  price: number;
  category: string;
  // Add other properties as needed
}
@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  private readonly tokenKey = 'token'; // Clé du jeton dans le stockage local
  private apiUrl = 'http://localhost:8087/menu'; // URL of your backend endpoint

  private baseUrl = 'http://localhost:8087/commandes';
  private selectedCategorySubject = new BehaviorSubject<string>('all'); // Default category is 'all'
  selectedCategory$ = this.selectedCategorySubject.asObservable();
  constructor(private http: HttpClient) {}
   // Vérifie si un jeton d'authentification est présent dans le stockage local
   isAuthenticated(): boolean {
    const token = localStorage.getItem(this.tokenKey);
    

    return !!token; // Retourne true si le jeton est présent, sinon false
  }
  placeOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(this.baseUrl, order);
  }
  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.baseUrl);
  }
  updateOrderStatus(orderId: number, status: string): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${orderId}/complete`, {});
  }
  deleteOrder(orderId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${orderId}`);
  }


  // Fetch menu items by category
  getMenuItems(category: string): Observable<MenuItem[]> {
    const params = { category: category };
    return this.http.get<MenuItem[]>(this.apiUrl, { params });
  }

  // Set the selected category
  setSelectedCategory(category: string): void {
    this.selectedCategorySubject.next(category);
  }

  // Get the current selected category
  getSelectedCategory(): string {
    return this.selectedCategorySubject.value;
  }
}