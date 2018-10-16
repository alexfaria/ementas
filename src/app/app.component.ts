import { Component, OnInit } from '@angular/core';
import { SettingsService } from './settings.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private settings: SettingsService) {}
  darkMode: boolean = false;

  ngOnInit(): void {
    this.darkMode = this.settings.get('darkMode');
  }

  toggleTheme(): void {
    this.darkMode = !this.darkMode;
    this.settings.set('darkMode', this.darkMode);
  }
}
