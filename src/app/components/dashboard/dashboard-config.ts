import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class DashboardConfig {
   URLs =  {
       fake_data: '/users'
   };
}