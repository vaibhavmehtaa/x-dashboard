import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

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
  
  private _handleGet(service: string, options) {
    let opts = this._prepareHTTPOptions(options);
    return this._http.get(this.baseUrl + service, opts)
  }

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
      case 'GET':
        return this._handleGet(service, options);

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

  private _prepareHTTPOptions(options) {
    const {data, headers, requestOptions} = options;
    let params = new HttpParams();
    for (let key in data) {
      if (data[key]) {
        if (typeof data[key] === 'object') {
          params = params.set(key, JSON.stringify(data[key]));
        } else {
          params = params.set(key, data[key]);
        }
      }
    }
    let opts = {
      params,
      'withCredentials': true
    };
    if (headers) {
      let newHeaders = new HttpHeaders();
      newHeaders = newHeaders.append('Accept-Encoding', 'gzip');
      for (let key in headers) {
        if (headers[key]) {
          if (typeof headers[key] === 'string') {
            newHeaders = newHeaders.append(key, headers[key]);
          } else {
            newHeaders = newHeaders.append(key, headers[key].toString());
          }
        }
      }
      (opts as any).headers = newHeaders;
    }
    if (requestOptions) {
      opts = Object.assign({}, opts, requestOptions);
    }
    return opts;
  }
}
