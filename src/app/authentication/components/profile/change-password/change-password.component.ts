import { Component, OnInit, Input } from "@angular/core";
import { IChangePasswordComponent } from "./change-password.interface";
import { BsModalRef } from "ngx-bootstrap";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AlertService } from "src/app/shareds/services/alert.service";
import { ValidatorsService } from "src/app/shareds/services/validators.service";
import { AccountService } from "src/app/shareds/services/account.service";
import { AuthenService } from "src/app/services/authen.service";

@Component({
  selector: "app-change-password",
  templateUrl: "./change-password.component.html",
  styleUrls: ["./change-password.component.css"]
})
export class ChangePasswordComponent implements IChangePasswordComponent {
  form: FormGroup;

  @Input() modalRef: BsModalRef;

  constructor(
    private builder: FormBuilder,
    private alert: AlertService,
    private validators: ValidatorsService,
    private account: AccountService,
    private authen: AuthenService
  ) {
    this.initialCreateFormData();
  }

  onSubmit() {
    if (this.form.invalid) {
      return this.alert.someting_wrong();
    }
    this.account
      .onChangePassword(this.authen.getAuthenticared(), this.form.value)
      .then(user => {
        this.alert.someting_wrong('เปลี่ยนรหัสผ่านสำเร็จ', 'success', 'center');
        this.modalRef.hide();
        console.log(user);
      })
      .catch(err => this.alert.someting_wrong(err.Massage));

    console.log(this.form.value);
  }

  private initialCreateFormData() {
    this.form = this.builder.group({
      old_pass: ["", [Validators.required]],
      new_pass: ["", [Validators.required, this.validators.isPassword]],
      cnew_pass: [
        "",
        [Validators.required, this.validators.comparePassword("new_pass")]
      ]
    });
  }
}
