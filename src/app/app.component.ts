import { Component } from '@angular/core';
import { LayoutService } from './components/layout/_services/layout.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  user = undefined;

  constructor(
    private _layoutServices: LayoutService,
    private router: Router
  ) {}

  ngOnInit() {
    this._layoutServices.currentUser$.subscribe((userData) => {
      this.user = (userData) ? userData : this.router.navigate(['/login']);
    });
  }
}
