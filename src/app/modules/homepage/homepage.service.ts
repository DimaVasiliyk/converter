import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomepageService {

  constructor(private http: HttpClient) { }

  public getcurrentCurrency(typeCurrency:string) {
      const getcurrentCurrencyURL = "https://v6.exchangerate-api.com/v6/1054b9c8493b4b7826297363/latest/"
      return this.http.get(getcurrentCurrencyURL + typeCurrency);
  }
}
