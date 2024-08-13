import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { jwtDecode } from 'jwt-decode';
import { UserServiceService } from 'src/app/user-service.service';

@Component({
  selector: 'app-headerr',
  templateUrl: './headerr.component.html',
  styleUrls: ['./headerr.component.css']
})
export class HeaderrComponent implements OnInit {
  lang:string ='';
  isLoggedIn: boolean = false;
  userName: string = '';  // Initialize with an empty string

  constructor(private translateService:TranslateService, private userservice : UserServiceService){
    
  }
  ngOnInit(): void {
    // Retrieve the language from localStorage or default to 'en'
    this.lang = localStorage.getItem('lang') || 'en';
    // Apply the language setting
    this.translateService.use(this.lang);

    this.isLoggedIn = this.userservice.isAuthenticated();

    this.setUserName(); 
  }
  setUserName(): void {
    const token = localStorage.getItem('token');
    console.log("token", token);
    
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        this.userName = decodedToken.sub;
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    } else {
      console.log('No token found');
    }
  }
  ChangeLang(lang: any): void {
    const selectedLanguage = lang.target.value;
    // Save the selected language to localStorage
    localStorage.setItem('lang', selectedLanguage);
    // Change the language in the translateService
    this.translateService.use(selectedLanguage);
  }
  onLogout(): void {
    this.userservice.logout();
    this.isLoggedIn = false; // Mettre à jour l'état après la déconnexion
  }
 }




