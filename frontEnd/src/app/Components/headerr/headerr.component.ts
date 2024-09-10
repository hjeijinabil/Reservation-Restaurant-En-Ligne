import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { jwtDecode } from 'jwt-decode';
import { UserServiceService } from 'src/app/user-service.service';

@Component({
  selector: 'app-headerr',
  templateUrl: './headerr.component.html',
  styleUrls: ['./headerr.component.css']
})
export class HeaderrComponent implements OnInit {
  lang: string = '';
  isLoggedIn: boolean = false;
  userName: string = '';

  constructor(
    private translateService: TranslateService,
    private userservice: UserServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.lang = localStorage.getItem('lang') || 'en';
    this.translateService.use(this.lang);

    this.isLoggedIn = this.userservice.isAuthenticated();

    // If the user is authenticated, refresh the component to display the username
    if (this.isLoggedIn) {
      this.refreshComponent();
    }
    this.setUserName();
  
  }

  setUserName(): void {
    const token = localStorage.getItem('token');
    console.log('token', token);

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
    localStorage.setItem('lang', selectedLanguage);
    this.translateService.use(selectedLanguage);
  }

  onLogout(): void {
    this.userservice.logout();
    this.isLoggedIn = false;
    // Redirect to home page after logout
    this.router.navigate(['/']);
  }

  refreshComponent(): void {
    // Use the router to navigate to the same route to refresh the component
    this.router.navigate([this.router.url]);
  }
}