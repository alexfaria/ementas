import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SettingsService {

  private language: BehaviorSubject<string> = new BehaviorSubject('pt');
  private darkMode: BehaviorSubject<boolean> = new BehaviorSubject(false);
  currentLanguage = this.language.asObservable();
  currentDarkMode = this.darkMode.asObservable();

  constructor() {
    const darkMode = this.get('darkMode');
    const language = this.get('language');
    if (darkMode != null) {
      this.darkMode.next(darkMode);
    }
    if (language != null) {
      this.language.next(language);
    }
  }

  changeLanguage(language: string) {
    this.language.next(language);
    this.set('language', language);
  }

  changeDarkMode(darkMode: boolean) {
    this.darkMode.next(darkMode);
    this.set('darkMode', darkMode);
  }

  private set(key: string, data: any): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.error('Error saving to localStorage', e);
    }
  }

  private get(key: string) {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (e) {
      console.error('Error getting data from localStorage', e);
      return null;
    }
  }
}