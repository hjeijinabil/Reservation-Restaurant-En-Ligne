import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AddProductService } from 'src/app/Services/add-product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  product: any = {
    name: '',
    description: '',
    price: null
  };

  constructor(private apiService: AddProductService) {}

  onSubmit(productForm: NgForm) {
    if (productForm.valid) {
      this.apiService.addProduct(this.product).subscribe(
        (response) => {
          console.log('Product added successfully:', response);
          productForm.resetForm();
        },
        (error) => {
          console.error('Error adding product:', error);
        }
      );
    } else {
      console.error('Form is invalid');
    }
  }
}
