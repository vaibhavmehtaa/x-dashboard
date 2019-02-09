import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppConfig } from '../lib/app-config';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  apiBusy: Boolean = false;
  pendingRequestsCount = 0;

  constructor(
    private _appConfig: AppConfig,
    private _http: HttpClient
  ) { }
  baseUrl: string = this._appConfig.baseURL;

  private _handlePost(service: String, options) {
    const { data } = options;
    const body = data ? JSON.stringify(data) : {};
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    // let opts = { headers, 'withCredentials': true };
    const opts = {headers};
    // let headers = new HttpHeaders().set();
    return this._http.post(this.baseUrl + service, body, opts)
      .pipe(catchError(this._handleError));
  }

  api(service: string, options) {
    this.apiBusy = true;
    const { type } = options;
    switch (type) {
      // case 'GET':
      //   return this._handleGet(service, options);

      case 'POST':
        return this._handlePost(service, options);

      // case 'DELETE':
      //   return this._handleDelete(service, options);

      // case 'PUT':
      //   return this._handlePut(service, options);

      // case 'FORMPOST':
      //   return this._handleFormPost(service, options);

      // default:
      //   return this._handlePost(service, options);
    }
  }


  private _handleError(error: any) {
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    // console.error(errMsg); // log to console instead
    return Observable.throw(error);
  }
}
