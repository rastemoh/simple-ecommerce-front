import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { CommonService } from '../shared/common.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });
  error = '';
  constructor(private api: ApiService, private common: CommonService) { }

  ngOnInit() {

  }

  onSubmit() {
    const credentials = this.loginForm.value;
    this.api.login(credentials.email, credentials.password)
      .then((result: boolean) => {
        if (result) {
          this.common.navigateToLink('/admin');
        } else {
          this.error = 'Login failed';
        }
      });
  }
}
