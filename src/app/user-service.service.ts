import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt'; // Assumed you're using this for decoding JWT


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
interface JwtPayload {
  sub: string;
  role: string;
  iat: number;
  exp: number;
}
@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  private jwtHelper = new JwtHelperService();

  private apiUrl = 'http://localhost:8087/auth'; // Remplacez par l'URL de votre backend
  private readonly tokenKey = 'token'; // Clé du jeton dans le stockage local
  private readonly userKey = 'userRole'; // Clé des données utilisateur dans le stockage local

  constructor(private http: HttpClient, private router:Router) { }

  //REGISTER
  registerUser(user: User): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    console.log("hh", user);
    
    return this.http.post<any>(`${this.apiUrl}/register`, user, { headers });
  }

  // LOGIN
  loginUser(user: User): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.apiUrl}/login`, user, { headers });
  }
     // Récupère le nom d'utilisateur à partir du jeton
  getUserName(): string | null {
    const token = localStorage.getItem(this.tokenKey);
    if (token) {
      try {
        const decoded: JwtPayload = jwtDecode(token);
        return decoded.sub; // Retourne le nom d'utilisateur (ou l'identifiant)
      } catch (e) {
        console.error('Token decoding failed', e);
        return null;
      }
    }
    return null;
  }
    // Vérifie si un jeton d'authentification est présent dans le stockage local
    isAuthenticated(): boolean {
      const token = localStorage.getItem(this.tokenKey);
      

      return !!token; // Retourne true si le jeton est présent, sinon false
    }
      // Retourne le rôle de l'utilisateur authentifié
  getUserRole(): string | null {
    const token = localStorage.getItem(this.tokenKey);

    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        return decodedToken.role || null; // Assumes 'role' is the key in the token payload
      } catch (error) {
        console.error('Token decoding failed:', error);
        return null;
      }
    }
    return null; // No token present
  }

  isAdmin(): boolean {
    const role = this.getUserRole();
    return role === 'ADMIN'; // Assumes 'admin' is the role identifier
  }
  logout(): void {
    // Supprimer le jeton d'authentification du stockage local
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    // Rediriger vers la page de connexion ou d'accueil
    this.router.navigate(['/']);
  }
  getUserId(): number | null {
    // Example logic to retrieve user ID
    // This might come from a session, JWT token, or other methods
    // For instance:
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    return user?.id || null; // Return employee ID if available
  }
}
