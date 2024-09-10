import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { jwtDecode } from 'jwt-decode';
import { UserServiceService } from 'src/app/user-service.service';

@Component({
  selector: 'app-dasboardd',
  templateUrl: './dasboardd.component.html',
  styleUrls: ['./dasboardd.component.css']
})
export class DasboarddComponent implements OnInit {
  isAdmin: boolean = false;

  lang:string ='';
  isLoggedIn: boolean = false;
  userName: string = '';  // Initialize with an empty string

  constructor(private translateService:TranslateService, private userservice:UserServiceService){
    
  }
  ngOnInit(): void {
    this.isAdmin = this.userservice.isAdmin();

    // Retrieve the language from localStorage or default to 'en'
    this.lang = localStorage.getItem('lang') || 'en';
    // Apply the language setting
    this.translateService.use(this.lang);
  

    

  }


  ChangeLang(lang: any): void {
    const selectedLanguage = lang.target.value;
    // Save the selected language to localStorage
    localStorage.setItem('lang', selectedLanguage);
    // Change the language in the translateService
    this.translateService.use(selectedLanguage);
  }


}