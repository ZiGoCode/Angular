import { Component, OnInit } from '@angular/core';
import { AppURL } from 'src/app/app.url';
import { IRegisterComponent } from './register.interface';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { AlertService } from 'src/app/shareds/services/alert.service';
import { AccountService } from 'src/app/shareds/services/account.service';
import { Router } from '@angular/router';
import { ValidatorsService } from 'src/app/shareds/services/validators.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements IRegisterComponent {
  form: FormGroup;
  Url = AppURL;

  constructor(
    private builder: FormBuilder,
    private alert: AlertService,
    private account: AccountService,
    private router: Router,
    private validators: ValidatorsService
  ) {

    this.initialCreateFormData();

  }

  onSubmit() {
    if (this.form.invalid) {
      return this.alert.someting_wrong();
    }
    this.account
      .onRegister(this.form.value)
      .then(res => {
        this.alert.someting_wrong('ลงทะเบียนสำเร็จ', 'success', 'center');
        this.router.navigateByUrl('/login');
      })
      .catch(err => this.alert.someting_wrong(err.Message));
  }

  private initialCreateFormData() {
    this.form = this.builder.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, this.validators.isPassword]],
      cpassword: ['', [Validators.required, this.validators.comparePassword('password')]]
    });
  }


}
