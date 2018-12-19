import { Component, OnInit } from "@angular/core";
import { AppURL } from "src/app/app.url";
import { ILoginComponent } from "./login.interface";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AlertService } from "src/app/shareds/services/alert.service";
import { Router } from "@angular/router";
import { AuthURL } from "src/app/authentication/authentication.url";
import { AccountService } from "src/app/shareds/services/account.service";
import { AuthenService } from "src/app/services/authen.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements ILoginComponent {
  form: FormGroup;
  Url = AppURL;

  constructor(
    private builder: FormBuilder,
    private alert: AlertService,
    private router: Router,
    private account: AccountService,
    private authen: AuthenService
  ) {
    this.initialCreateFormData();
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return this.alert.someting_wrong();
    }
    this.account
      .onLogin(this.form.value)
      .then(res => {
        this.authen.setAuthenticated(res.accessToken);
        this.router.navigate(['/', AppURL.Authen, AuthURL.Dashboard]);
        this.alert.someting_wrong('เข้าสู่ระบบสำเร็จ', 'success', 'center');
      })
      .catch(err =>
        this.alert.someting_wrong(
          'ชื่อผู้ใช้งานหรือรหัสผ้านไม่ถูกต้อง',
          'danger',
          'center'
        )
      );
  }

  private initialCreateFormData() {
    this.form = this.builder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      remember: [true]
    });
  }
}
