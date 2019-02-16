import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../layout/_services/layout.service';
import { FakeDataService } from './_services/-fake-data.service';

@Component({
  selector: 'x-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  cars: any[];
  cols: any[];
  brands: any[];
  colors: any[];
  yearFilter: number;
  yearTimeout: any;
  
  constructor(
    private carService: LayoutService,
    private _fakeService: FakeDataService
  ) { }

  ngOnInit() {
    this.brands = [
      { label: 'All Brands', value: null },
      { label: 'Audi', value: 'Audi' },
      { label: 'BMW', value: 'BMW' },
      { label: 'Fiat', value: 'Fiat' },
      { label: 'Honda', value: 'Honda' },
      { label: 'Jaguar', value: 'Jaguar' },
      { label: 'Mercedes', value: 'Mercedes' },
      { label: 'Renault', value: 'Renault' },
      { label: 'VW', value: 'VW' },
      { label: 'Volvo', value: 'Volvo' }
  ];
    this.colors = [
        { label: 'White', value: 'White' },
        { label: 'Green', value: 'Green' },
        { label: 'Silver', value: 'Silver' },
        { label: 'Black', value: 'Black' },
        { label: 'Red', value: 'Red' },
        { label: 'Maroon', value: 'Maroon' },
        { label: 'Brown', value: 'Brown' },
        { label: 'Orange', value: 'Orange' },
        { label: 'Blue', value: 'Blue' }
    ];
    this.cols = [
      { field: 'vin', header: 'Vin' },
      { field: 'year', header: 'Year' },
      { field: 'brand', header: 'Brand' },
      { field: 'color', header: 'Color' }
    ];
    let opts = {type: 'GET', data: {
      // page: 2,
      foo: 'bar'
    }}

    this._fakeService.getFakeData(opts).subscribe( (data) => {
      console.log(data);
    })

  }
  
  
  onYearChange(event, dt) {
    if (this.yearTimeout) {
        clearTimeout(this.yearTimeout);
    }

    this.yearTimeout = setTimeout(() => {
        dt.filter(event.value, 'year', 'gt');
    }, 250);
  }
}
