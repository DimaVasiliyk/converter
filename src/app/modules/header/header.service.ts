import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

constructor(private http: HttpClient) { }

public getUAHCurrency() {
  const getcurrentCurrencyURL = "https://api.monobank.ua/bank/currency"
  return this.http.get(getcurrentCurrencyURL);
}
}
