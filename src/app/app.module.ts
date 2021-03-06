import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { DiariasComponent } from './diarias/diarias.component';
import { BottomSheetComponent } from './bottomsheet/bottomsheet.component';
import { EmentasService } from './services/ementas.service';
import { SettingsService } from './services/settings.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/* Material Imports */
import {
  MatToolbarModule,
  MatListModule,
  MatExpansionModule,
  MatButtonModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatCardModule,
  MatGridListModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatBadgeModule,
  MatFormFieldModule,
  MatInputModule,
  MatSidenavModule,
  MatSlideToggleModule,
  MatMenuModule,
  MatSnackBarModule,
  MAT_DATE_LOCALE,
  MatBottomSheetModule
} from '@angular/material';

/* Hammer Imports */
import 'hammerjs';
import 'hammer-timejs';

import {
  HammerGestureConfig,
  HAMMER_GESTURE_CONFIG
} from '@angular/platform-browser';

declare var Hammer: any;
export class HammerConfig extends HammerGestureConfig {
  buildHammer(element: HTMLElement) {
    let mc = new Hammer(element, {
      touchAction: 'pan-y'
    });
    return mc;
  }
}

@NgModule({
  declarations: [AppComponent, DiariasComponent, BottomSheetComponent],
  entryComponents: [BottomSheetComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production
    }),
    BrowserAnimationsModule,
    /* Material Imports */
    MatToolbarModule,
    MatListModule,
    MatExpansionModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatGridListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatBadgeModule,
    MatFormFieldModule,
    MatInputModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSnackBarModule,
    MatBottomSheetModule
  ],
  providers: [
    EmentasService,
    SettingsService,
    { provide: MAT_DATE_LOCALE, useValue: 'pt-PT' },
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: HammerConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
