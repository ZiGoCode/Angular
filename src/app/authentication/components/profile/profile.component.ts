import { Component, OnInit, TemplateRef } from '@angular/core';
import { IProfileComponent } from './profile.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AccountService } from 'src/app/shareds/services/account.service';
import { AuthenService } from 'src/app/services/authen.service';
import { AlertService } from 'src/app/shareds/services/alert.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements IProfileComponent {
  form: FormGroup;
  modalRef: BsModalRef;
  positionItem: any[] = [
    'Frontend Developer',
    'Backend Developer',
    'Mobile Developer'
  ];

  constructor(
    private buider: FormBuilder,
    private account: AccountService,
    private authen: AuthenService,
    private alert: AlertService,
    private modalService: BsModalService
  ) {
    this.initialCreateFormData();
    this.initialLoadUpdateFormData();
  }

  onSubmit() {
    if (this.form.invalid) return this.alert.someting_wrong();
    this.account
      .onUpdateProfile(this.authen.getAuthenticared(), this.form.value)
      .then(() => this.alert.someting_wrong('แก้ไขข้อมูลสำเร็จ', 'success', 'center'))
      .catch(err => this.alert.someting_wrong(err.Massage));
    console.log(this.form.value);
  }
  onConvertImage(input: HTMLInputElement) {
    const imageControl = this.form.controls['image'];
    const imageTypes = ['image/jpeg', 'image/png'];

    imageControl.setValue(null);
    if (input.files.length == 0) return;
    if (imageTypes.indexOf(input.files[0].type) < 0) {
      input.value = null;
      return this.alert.someting_wrong('กรุณาอัพโหลดรูปภาพเท่านั้น');
    }
    const reader = new FileReader();
    reader.readAsDataURL(input.files[0]);
    reader.addEventListener('load', () => {
      imageControl.setValue(reader.result);
    });

  }

  openModal(template: TemplateRef<any>) {
    console.log(template);
    this.modalRef = this.modalService.show(template);
  }

  private initialCreateFormData() {
    this.form = this.buider.group({
      email: [''],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      position: ['', Validators.required],
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
