import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AddProductService } from 'src/app/Services/add-product.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {
  product: any = {
    id: null,
    name: '',
    description: '',
    price: null
  };

  constructor(private route: ActivatedRoute,private productService: AddProductService, private router: Router) {}

  ngOnInit(): void {
    // Retrieve the product ID from the URL
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      // Fetch product data from the server using the ID
      this.productService.getProductById(productId).subscribe(
        (productData) => {
          this.product = productData; // Populate the product object with the data from the API
        },
        (error) => {
          console.error('Error fetching product data', error);
        }
      );
    }
  }

  onSubmit(productForm: NgForm): void {
    if (productForm.valid) {
      this.productService.updateProduct(this.product.id, this.product).subscribe(
        (response) => {
          console.log('Product updated successfully:', response);
          this.router.navigate(['/list-product']);
          // You can reset the form or navigate to another page after updating
        },
        (error) => {
          console.error('Error updating product:', error);
        }
      );
    } else {
      console.error('Form is invalid');
    }
  }
}