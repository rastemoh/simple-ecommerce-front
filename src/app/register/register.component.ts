import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { CommonService } from '../shared/common.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  signupForm = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
    name: new FormControl()
  });
  error = '';
  constructor(private api: ApiService, private common: CommonService) { }

  ngOnInit() {
  }

  onSubmit() {
    const cred = this.signupForm.value;
    this.api.register(cred.email, cred.password, cred.name)
      .then(() => {
        this.common.navigateToLink('/login');
      })
      .catch(error => {
        this.error = error;
      });
  }
}
