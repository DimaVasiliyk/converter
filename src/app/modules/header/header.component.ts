import { Component, OnInit } from '@angular/core';
import { HeaderService } from './header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  exchangeRateUSD = 0;
  exchangeRateEUR = 0;

  constructor(public headerService: HeaderService) { }
  ngOnInit() {
    this.headerService.getUAHCurrency().subscribe((res: any) => {
      console.log(res)
      for (let i = 0; i < res.length; i++) {
        if (res[i].currencyCodeA == 840 && res[i].currencyCodeB == 980) {
          this.exchangeRateUSD = res[i].rateBuy
        }
        if (res[i].currencyCodeA == 978 && res[i].currencyCodeB == 980) {
          this.exchangeRateEUR = res[i].rateBuy
        }
      }
    })
  }
}
