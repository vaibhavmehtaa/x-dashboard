import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  private localStorageBase: any = 'Ideal.app.';

  set(key: string, data: any) {
    if (!window.localStorage) { return; }

    if (typeof data === 'string') {
      window.localStorage.setItem(this.localStorageBase + key, data);
    } else {
      window.localStorage.setItem(this.localStorageBase + key, JSON.stringify(data));
    }
  }

  get(key: string) {
    if (!window.localStorage) { return; }
    return window.localStorage.getItem(this.localStorageBase + key);
  }

  remove(key: string) {
    if (!window.localStorage) { return; }
    window.localStorage.removeItem(this.localStorageBase + key);
  }
}