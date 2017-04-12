import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { UsersService } from '../services/index';
import { User } from '../models/index';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    form: FormGroup;
    model: any = {};
    loading = false;

    constructor(
        private router: Router,
        private usersService: UsersService) {
            this.form = this._buildForm();
        }

  ngOnInit() {
    this.model = new User();
    this.loading = false;
  }

  ngOnChange(record) {
      //this.model = new User();
      console.log('record:', record);
  }

  register() {
        this.loading = true;
        this.usersService.signup(this.model)
            .subscribe(
                data => {
                  console.log("registered");
                    //this.router.navigate(['/login']);
                },
                error => {
                    this.loading = false;
                });
  }

    private _buildForm() {
      return new FormGroup({
        firstName: new FormControl('', Validators.required),
        lastName: new FormControl('', Validators.required),
        username: new FormControl('', Validators.required),
        email: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required)
      });
    }

}
