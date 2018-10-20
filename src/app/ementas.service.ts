import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Diaria } from './models';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmentasService {
  private diarias: Diaria[];

  constructor(private http: HttpClient) {}

  getEmentas(language: string) {
    const apiUrl: string = environment.baseUrl + language.toUpperCase();

    return this.http.get(apiUrl).pipe(
      map(data => {
        this.diarias = [];
        for (let i in data['InfoDiaria']) {
          this.diarias.push(new Diaria().deserialize(data['InfoDiaria'][i]));
        }
        return this.diarias;
      }),
      tap(data => {
        localStorage.setItem('diarias', JSON.stringify(this.diarias));
      })
    );
  }

  private fromLocalStorage() {
    const json = JSON.parse(localStorage.getItem('diarias'));
    if (!json) return false;
    this.diarias = [];
    for (let i in json) {
      this.diarias.push(new Diaria().fromJson(json[i]));
    }
    return true;
  }
}
