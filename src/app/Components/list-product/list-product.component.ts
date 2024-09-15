import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AddProductService } from 'src/app/Services/add-product.service';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent {
  products: any[] = [];
  lang:string ='';
  constructor(private productService: AddProductService,private translateService:TranslateService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(
      (data: any[]) => {
        this.products = data;
      },
      (error: any) => {
        console.error('Error fetching products:', error);
      }
    );
  }
 

  deleteProduct(productId: number): void {
    this.productService.deleteProduct(productId).subscribe(
      (response: any) => {
        console.log('Product deleted successfully:', response);
        this.products = this.products.filter(product => product.id !== productId); // Update the product list
      },
      (error: any) => {
        console.error('Error deleting product:', error);
      }
    );
  }
}
