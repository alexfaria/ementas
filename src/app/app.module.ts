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

@NgModule({
  declarations: [AppComponent, DiariaDetailComponent, DiariasComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })],
  providers: [EmentasService],
  bootstrap: [AppComponent]
})
export class AppModule {}
