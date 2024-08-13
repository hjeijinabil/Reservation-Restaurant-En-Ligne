import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddProductService {

  
  private apiUrl = 'http://localhost:8087/products'; // Replace with your API endpoint

  constructor(private http: HttpClient) {}

  addProduct(product: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, product);
  }
  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  deleteProduct(productId: number): Observable<any> {
    const url = `${this.apiUrl}/${productId}`;
    return this.http.delete<any>(url);
  }
  getProductById(productId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${productId}`);
  }

  updateProduct(productId: string, productData: any): Observable<any> {
    const url = `${this.apiUrl}/${productId}`;
    return this.http.put<any>(url, productData);
  }
}
