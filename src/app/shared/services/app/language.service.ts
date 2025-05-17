import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private renderer: Renderer2;
  private currentLang = 'en';

  constructor(
    private translate: TranslateService,
    rendererFactory: RendererFactory2
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.initLanguage();
  }

  private initLanguage() {
    this.currentLang = localStorage.getItem('lang') || 'en';
    this.setLanguage(this.currentLang);
  }

  setLanguage(lang: string) {
    this.currentLang = lang;
    this.translate.use(lang);
    localStorage.setItem('lang', lang);

    if (lang === 'ar') {
      this.renderer.setAttribute(document.documentElement, 'dir', 'rtl');
      this.renderer.setAttribute(document.documentElement, 'lang', 'ar');
    } else {
      this.renderer.setAttribute(document.documentElement, 'dir', 'ltr');
      this.renderer.setAttribute(document.documentElement, 'lang', 'en');
    }
  }

  toggleLanguage() {
    if (this.currentLang === 'en') {
      this.setLanguage('ar');
    } else {
      this.setLanguage('en');
    }
  }

  getCurrentLanguage(): string {
    return this.currentLang;
  }
}
