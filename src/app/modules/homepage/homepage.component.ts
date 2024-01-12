import { Component } from '@angular/core';
import { HomepageService } from './homepage.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { combineLatest, debounceTime, distinctUntilChanged } from 'rxjs';

interface Currency {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {

  public searchForm: FormGroup;
  public conversionRate = null;

  public currencies: Currency[] = [
    { value: 'None', viewValue: 'None' },
    { value: 'CZK', viewValue: 'CZK' },
    { value: 'USD', viewValue: 'USD' },
    { value: 'UAH', viewValue: 'UAH' },
    { value: 'PLN', viewValue: 'PLN' },
    { value: 'EUR', viewValue: 'EUR' },
  ];

  constructor(private homepageService: HomepageService, private fb: FormBuilder) {

    this.searchForm = this.fb.group({
      firstCoin: new FormControl(''),
      typeCurrencyFirst: new FormControl(this.currencies[0].value),
      secondCoin: new FormControl(''),
      typeCurrencySecond: new FormControl(this.currencies[0].value),
    });

    combineLatest([
      this.searchForm.controls['firstCoin']?.valueChanges.pipe(distinctUntilChanged()),
      this.searchForm.controls['typeCurrencyFirst']?.valueChanges.pipe(distinctUntilChanged()),
      this.searchForm.controls['typeCurrencySecond']?.valueChanges.pipe(distinctUntilChanged())
    ]).pipe(debounceTime(800)).subscribe(([value1, value2, value3]) => {
      this.homepageService.getcurrentCurrency(value2).subscribe((res: any) => {
        this.conversionRate = res.conversion_rates[value3]
        let calculatedValue = value1 * res.conversion_rates[value3]
        if (calculatedValue !== this.searchForm.get('secondCoin')?.value) {
          this.searchForm.get('secondCoin')?.setValue(calculatedValue);
        }
      })
    });

    this.searchForm.controls['secondCoin']?.valueChanges.subscribe((value) => {
      let calculatedValue = value / this.conversionRate!;
      if (calculatedValue !== this.searchForm.get('firstCoin')?.value) {
        this.searchForm.get('firstCoin')?.setValue(calculatedValue);
      }
    });
  }

}
