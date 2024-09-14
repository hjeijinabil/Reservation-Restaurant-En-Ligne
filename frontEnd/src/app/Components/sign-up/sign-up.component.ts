import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/user-service.service';
export interface User {
  id?: number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role?: Role;
}

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER'
}
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  registerForm: FormGroup;
  roles = [Role.ADMIN, Role.USER];

  constructor(private fb: FormBuilder, private apiService: UserServiceService , private route:Router) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: [Role.USER, Validators.required] // default role is USER
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const user: User = this.registerForm.value;
      this.apiService.registerUser(user).subscribe(
        (response) => {
          console.log('Registration successful:', response);
          // Redirect to another page after successful registration
          this.route.navigate(['/login']);       },
       
      );
    }
  }}