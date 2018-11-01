import { Component, OnInit } from '@angular/core';
import {
  MatIconRegistry,
  MatSnackBar,
  MatBottomSheet
} from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { trigger, transition, animate, style } from '@angular/animations';
import { environment } from '../../environments/environment';
import { EmentasService } from '../ementas.service';
import { SettingsService } from '../settings.service';
import { BottomSheetComponent } from '../bottomsheet/bottomsheet.component';
import { Diaria } from '../models';
import { strings } from '../strings';

@Component({
  selector: 'app-diarias',
  templateUrl: './diarias.component.html',
  styleUrls: ['./diarias.component.css'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
      ]),
      transition(':leave', [
        style({ transform: 'translateX(0%)' }),
        animate('0.5s ease-in-out', style({ transform: 'translateX(100%)' }))
      ])
    ])
  ]
})
export class DiariasComponent implements OnInit {
  readonly strings = strings;
  SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };
  diarias: Diaria[];
  index: number;
  atual: Diaria;
  language: string;
  loading: boolean = true;
  date: Date = new Date();

  constructor(
    private ementasService: EmentasService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private snackBar: MatSnackBar,
    private bottomSheet: MatBottomSheet,
    private settings: SettingsService
  ) {
    this.settings.currentLanguage.subscribe(language => {
      if (this.language != language) {
        this.language = language;
        this.getEmentas();
      }
    });
    this.registerIcons();
  }

  ngOnInit(): void {
    this.loading = true;
    // this.getEmentas();
  }

  getEmentas() {
    this.loading = true;
    this.ementasService
      .getEmentas(this.language)
      .subscribe((diarias: Diaria[]) => {
        this.diarias = diarias;
        let found;
        do {
          found = false;
          for (let i = 0; i < this.diarias.length; i++) {
            if (this.diarias[i].isSameDay(this.date)) {
              this.index = i;
              this.atual = this.diarias[i];
              found = true;
            }
          }
          if (!found) {
            this.date.setDate(this.date.getDate() + 1);
          }
        } while(!found);
        this.loading = false;
      });
  }

  showAllergens(allergens) {
    const string =
      strings.allergens[this.language] + ': ' + allergens.join(', ');
    this.snackBar.open(string, null, {
      duration: 2000,
      verticalPosition: 'top'
    });
  }

  openBottomSheet(): void {
    this.bottomSheet.open(BottomSheetComponent, {
      data: this.atual['observacoes']
    });
  }

  updateDiaria(event) {
    for (let i in this.diarias) {
      if (this.diarias[i].isSameDay(event.value)) {
        this.atual = this.diarias[i];
        this.index = parseInt(i);
      }
    }
  }

  goToToday() {
    for (let i in this.diarias) {
      if (this.diarias[i].isSameDay(this.date)) {
        this.atual = this.diarias[i];
        this.index = parseInt(i);
      }
    }
  }

  swipeLeft() {
    const isLast = this.index === this.diarias.length - 1;
    this.index = isLast ? this.index : this.index + 1;
    this.atual = this.diarias[this.index];
  }

  swipeRight() {
    const isFirst = this.index === 0;
    this.index = isFirst ? this.index : this.index - 1;
    this.atual = this.diarias[this.index];
  }

  registerIcons() {
    const icons = ['peixe', 'sopa', 'carne', 'dieta', 'vegetariano', 'info'];

    for (let i in icons) {
      this.matIconRegistry.addSvgIcon(
        icons[i],
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          `${environment.assetsPath}icons/${icons[i]}.svg`
        )
      );
    }
  }
}
