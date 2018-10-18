import { Component, OnInit } from '@angular/core';
import { SettingsService } from './settings.service';
import { DateAdapter } from '@angular/material';
import { strings } from './strings';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  readonly strings = strings;
  darkMode: boolean;
  language: string;

  constructor(
    private settings: SettingsService,
    private adapter: DateAdapter<any>
  ) {}

  ngOnInit(): void {
    this.settings.currentLanguage.subscribe(lang => (this.language = lang));
    this.settings.currentDarkMode.subscribe(darkMode => {
      this.darkMode = darkMode;
    });
  }

  toggleTheme(): void {
    this.settings.changeDarkMode(!this.darkMode);
  }

  refresh() {
    window.location.reload();
  }

  changeLanguage(language: string) {
    this.settings.changeLanguage(language);
    this.adapter.setLocale(language);
  }
}
