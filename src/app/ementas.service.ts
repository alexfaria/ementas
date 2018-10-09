import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  getDiaria(id: number) {
    if (localStorage.getItem('diarias')) {
      this.diarias = JSON.parse(localStorage.getItem('diarias'));
      return this.diarias.find(diaria => diaria.id == id);
    }
  }
}
