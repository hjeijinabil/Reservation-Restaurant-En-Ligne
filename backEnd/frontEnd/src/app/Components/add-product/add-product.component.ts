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
    category:'',
    price: null,
    image: null
  };

  constructor(private apiService: AddProductService) {}

  onFileChange(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.product.image = event.target.files[0];
    }
  }

  onSubmit(productForm: NgForm) {
    if (productForm.valid) {
      const formData = new FormData();
      formData.append('name', this.product.name);
      formData.append('description', this.product.description);
      formData.append('category', this.product.category);

      formData.append('price', this.product.price.toString());
      if (this.product.image) {
        formData.append('file', this.product.image);
      }

      this.apiService.addProduct(formData).subscribe(
        (response) => {
          console.log('Product added successfully:', response);
          productForm.resetForm();
          this.product.image = null; // Clear the file input
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
