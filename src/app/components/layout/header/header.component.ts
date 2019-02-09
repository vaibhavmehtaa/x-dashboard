import { Component, OnInit, Input } from '@angular/core';
import { LayoutService } from '../_services/layout.service';
import { Router } from '@angular/router';

@Component({
  selector: 'x-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() userInfo = this._layoutService.currentUsers;
  constructor(
    private _layoutService: LayoutService,
    private router: Router
  ) { }

  ngOnInit() {

  }

  logout($e) {
    this._layoutService.purgeAuth();
    this.router.navigate(['/login']);
  }

  isAuthorized(user) {
    if (typeof user === "string") {
      let info = JSON.parse(user);
      return (info.token);
    }else if (user.token) {
      return true;
    }
    return false;
  }
}
