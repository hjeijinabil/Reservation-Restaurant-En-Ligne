import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AddUserService } from 'src/app/Services/add-user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  user: any = {
    firstName: '',
    lastName: '',
    streetAddress: '',
    mobileNumber: '',
    email: ''
  };

  constructor(private apiService: AddUserService ) {}

  onSubmit(userForm: NgForm) {
    if (userForm.valid) {
      this.apiService.addUser(this.user).subscribe(
        (response) => {
          console.log('User added successfully:', response);
          // Vous pouvez également réinitialiser le formulaire ici si nécessaire
          userForm.resetForm();
        },
        (error) => {
          console.error('Error adding user:', error);
          // Gérer les erreurs d'ajout ici
        }
      );
    } else {
      console.error('Form is invalid');
    }
  }
}
