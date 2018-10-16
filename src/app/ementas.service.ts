import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Diaria } from './models';

@Injectable({
  providedIn: 'root'
})
export class EmentasService {
  private diarias: Diaria[];

  constructor(private http: HttpClient) {}

  getEmentas() {
    const apiUrl: string =
      'https://portaldossas.uc.pt/PySiges/services/signetpos/get_ementas.json?Lang=PT';

    if (this.fromLocalStorage()) {
      return of(this.diarias);
    }

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

  fromLocalStorage() {
    const json = JSON.parse(localStorage.getItem('diarias'));
    if (!json) return false;
    this.diarias = [];
    for (let i in json) {
      this.diarias.push(new Diaria().fromJson(json[i]));
    }
    return true;
  }
}
