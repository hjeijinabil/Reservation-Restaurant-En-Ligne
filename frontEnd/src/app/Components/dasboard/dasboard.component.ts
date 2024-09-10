import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-dasboard',
  templateUrl: './dasboard.component.html',
  styleUrls: ['./dasboard.component.css']
})
export class DasboardComponent implements OnInit {

  lang:string ='';

  constructor(private translateService:TranslateService){
    
  }
  ngOnInit(): void {
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
    // Refresh the page to apply language changes
    window.location.reload();
  }
}