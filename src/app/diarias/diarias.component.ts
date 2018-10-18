import { Component, OnInit, Input } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material';
import { environment } from '../../environments/environment';
import { EmentasService } from '../ementas.service';
import { SettingsService } from '../settings.service';
import { trigger, transition, animate, style } from '@angular/animations';
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
        animate('500ms ease-in', style({ transform: 'translateX(0%)' }))
      ]),
      transition(':leave', [
        style({ transform: 'translateX(0%)' }),
        animate('0.2s ease-in-out', style({ transform: 'translateX(-100%)' }))
      ])
    ])
  ]
})
export class DiariasComponent implements OnInit {
  readonly strings = strings;
  SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };
  diarias: Diaria[];
  loading: boolean;
  index: number;
  atual: Diaria;
  language: string;

  constructor(
    private ementasService: EmentasService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private snackBar: MatSnackBar,
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
        for (let i in this.diarias) {
          if (this.diarias[i].isToday()) {
            this.index = parseInt(i);
            this.atual = this.diarias[i];
          }
        }
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
      if (this.diarias[i].isToday()) {
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
    const icons = [
      {
        name: 'peixe',
        alternateName: 'fish'
      },
      {
        name: 'sopa',
        alternateName: 'soup'
      },
      {
        name: 'carne',
        alternateName: 'meat'
      },
      {
        name: 'dieta',
        alternateName: 'diet'
      },
      {
        name: 'vegetariano',
        alternateName: 'vegetarian'
      },
      {
        name: 'info',
        alternateName: 'info_material'
      }
    ];

    for (let i in icons) {
      this.matIconRegistry.addSvgIcon(
        icons[i].name,
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          `${environment.assetsPath}icons/${icons[i].name}.svg`
        )
      );
      this.matIconRegistry.addSvgIcon(
        icons[i].alternateName,
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          `${environment.assetsPath}icons/${icons[i].name}.svg`
        )
      );
    }
  }
}
