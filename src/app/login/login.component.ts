import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../interfaces/user/user';
import { AuthService } from '../services/auth/auth.service'
import { MatFormFieldControl } from '@angular/material'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isSubmitted = false;
  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.loginForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    });
  }

  get formControls() { return this.loginForm.controls; }

  login() {

    console.log('Here is loginform: ', this.loginForm.value);
    this.isSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    this.authService.login(this.loginForm.value).subscribe(res => {

      if (res.status === 200) {
        const response = JSON.parse(res._body);
        console.log(res);
        localStorage.setItem('ACCESS_TOKEN', response.data.access_token);
        this.router.navigate(['/dashboard']);
      } else {
        return;
      }
    });
  }

}
