import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { DashboardConfig } from '../../dashboard-config';

@Injectable({
  providedIn: 'root'
})
export class FakeDataService {

  constructor(
    private _apiService: ApiService,
    private _dashConfig: DashboardConfig
  ) { }

  public getFakeData(opts){
    return this._apiService.api(this._dashConfig.URLs.fake_data , opts);
  }
}
