import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/user-service.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private apiService: UserServiceService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],  // Updated field
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const credentials = this.loginForm.value;
      this.apiService.loginUser(credentials).subscribe(
        (response) => {
          console.log('Login successful:', response);
          if (response && response.token) {
            // Stockez le token JWT dans le localStorage
            localStorage.setItem('token', response.token);
            // Stockez le rôle dans le stockage local
            localStorage.setItem('userRole', response.role);

            // Redirigez l'utilisateur en fonction du rôle ou d'une autre logique de votre application
            if (response.role === 'ADMIN') {
              this.router.navigate(['/admin']);
            } else if (response.role === 'USER') {
              this.router.navigate(['/']);
            }
          } else {
            console.error('Token or role not found in response:', response);
            // Gérez le cas où le token ou le rôle n'est pas présent dans la réponse de l'API
          }
        },
        (error) => {
          console.error('Login error:', error);
          // Traitez les erreurs de connexion, par exemple affichez un message d'erreur à l'utilisateur
        }
      );
    }
  }
}