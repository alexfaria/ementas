import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, tap, retry, catchError } from 'rxjs/operators';
import { Diaria } from './../models';
import { environment } from '../../environments/environment';
import { throwError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmentasService {
  private diarias: Diaria[];

  constructor(private http: HttpClient) {}

  getEmentas(language: string) {
    const apiUrl: string = environment.baseUrl + language.toUpperCase();

    return this.http.get(apiUrl).pipe(
      retry(3),
      map(data => {
        this.diarias = [];
        for (let i in data['InfoDiaria']) {
          this.diarias.push(new Diaria().deserialize(data['InfoDiaria'][i]));
        }
        return this.diarias;
      }),
      tap(data => {
        localStorage.setItem('diarias', JSON.stringify(this.diarias));
      }),
      catchError(this.handleError.bind(this))
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

  private handleError(error: HttpErrorResponse) {
      console.error(error);
      if (this.fromLocalStorage()) {
        return of(this.diarias);
      } else {
        // return an observable with a user-facing error message
        return throwError('Erro a obter dados dos SASUC');
      }
    }
}
