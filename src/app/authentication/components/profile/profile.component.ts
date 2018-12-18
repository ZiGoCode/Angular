import { Component, OnInit } from '@angular/core';
import { IProfileComponent } from './profile.interface';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AccountService } from 'src/app/shareds/services/account.service';
import { AuthenService } from 'src/app/services/authen.service';
import { AlertService } from 'src/app/shareds/services/alert.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements IProfileComponent {
  form: FormGroup;
  positionItem: any[] = [
    'Frontend Developer',
    'Backend Developer',
    'Mobile Developer'
  ];

  constructor(
    private buider: FormBuilder,
    private account: AccountService,
    private authen: AuthenService,
    private alert: AlertService
  ) {
    this.initialCreateFormData();
    this.initialLoadUpdateFormData();
  }

  onSubmit() {
    console.log(this.form.value);
  }
  onConvertImage(input: HTMLInputElement) {
    const imageControl = this.form.controls['image'];
    imageControl.setValue(null);
    if (input.files.length == 0) return;
    const reader = new FileReader();
    reader.readAsDataURL(input.files[0]);
    reader.addEventListener('load', () => {
      imageControl.setValue(reader.result);
    });

  }

  private initialCreateFormData() {
    this.form = this.buider.group({
      email: [''],
      firstname: [''],
      lastname: [''],
      position: [''],
      image: [null]
    });
    this.form.get('email').disable();
  }

  private initialLoadUpdateFormData() {
    this.account
      .getUserLogin(this.authen.getAuthenticared())
      .then(user => {
        this.form.controls['email'].setValue(user.email);
        this.form.controls['firstname'].setValue(user.firstname);
        this.form.controls['lastname'].setValue(user.lastname);
        this.form.controls['position'].setValue(user.position);
        this.form.controls['image'].setValue(user.image);
        // console.log(this.form.value.image);
        console.log(user);
      })
      .catch(err => this.alert.someting_wrong(err.Message));
  }
}
