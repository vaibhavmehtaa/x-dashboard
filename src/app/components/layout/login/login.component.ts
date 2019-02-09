import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators as V } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LayoutService } from '../_services/layout.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'x-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private _layoutService: LayoutService,
    private _localStorage: LocalStorageService
  ) { 
    if (this._layoutService.currentUsers) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', V.required],
      password: ['', V.required]
    });

    this._layoutService.isAuthenticated$.subscribe((value) => {
      if (value) {
      this.router.navigate([this.returnUrl]);
    }
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.valid) {
      this.loading = true;
      const data = this.loginForm.value;
      this._layoutService.authUser(data);
    }
  }

}
