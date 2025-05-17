import { Component } from '@angular/core';
import { LanguageService } from '../../services/app/language.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  constructor(public languageService: LanguageService) {}

  toggleLang() {
    this.languageService.toggleLanguage();
  }
}
