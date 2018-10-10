import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DiariaDetailComponent } from './diaria-detail/diaria-detail.component';
import { DiariasComponent } from './diarias/diarias.component';
import { EmentasService } from './ementas.service';
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
  MatBadgeModule
} from '@angular/material';

import {
  HammerGestureConfig,
  HAMMER_GESTURE_CONFIG
} from '@angular/platform-browser';

import * as Hammer from 'hammerjs';

export class HammerConfig extends HammerGestureConfig {
  /* overrides = <any>{
    // swipe: { velocity: 0.4, threshold: 20 },
    // pan: { direction: 6 },
    pinch: { enabled: false },
    rotate: { enabled: false }
  }; */
  buildHammer(element: HTMLElement) {
    const mc = new Hammer(element, {
      touchAction: 'pan-y'
    });
    return mc;
  }
}

@NgModule({
  declarations: [AppComponent, DiariaDetailComponent, DiariasComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
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
    MatBadgeModule
  ],
  providers: [
    EmentasService,
    { provide: HAMMER_GESTURE_CONFIG, useClass: HammerConfig }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
