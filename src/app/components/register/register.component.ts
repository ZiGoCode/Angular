import { Component, OnInit } from '@angular/core';
import { AppURL } from 'src/app/app.url';
import { IRegisterComponent } from './register.interface';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { AlertService } from 'src/app/shareds/services/alert.service';
import { AccountService } from 'src/app/shareds/services/account.service';
import { Router } from '@angular/router';

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
    private router: Router
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
      password: ['', [Validators.required, Validators.pattern(/^[A-z0-9]{6,15}$/)]],
      cpassword: ['', [Validators.required, this.comparePassword('password')]]
    });
  }

  private comparePassword(passwordField: string) {
    return function (confirm_password: AbstractControl) {
      if (!confirm_password.parent) {
        return;
      }
      const password = confirm_password.parent.get(passwordField);
      const passwordSubscribe = password.valueChanges.subscribe(() => {
        confirm_password.updateValueAndValidity();
        passwordSubscribe.unsubscribe();
      });
      if (confirm_password.value === password.value) {
        return;
      }
      return { compare: true };
    }
  }

}
