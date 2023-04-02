import { Component, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AuthenService } from 'src/app/services/authen.service';
import { AccountService } from 'src/app/shared/services/account.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { SharedsService } from 'src/app/shared/services/shareds.service';
import { __values } from 'tslib';
import { IProfileComponent } from './profile.interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements IProfileComponent {
  modalRef!: BsModalRef;
  constructor(
    private builder: FormBuilder,
    private account: AccountService,
    private authen: AuthenService,
    private alert: AlertService,
    private modalService: BsModalService,
    private shareds: SharedsService
  ) {
    this.initialCreateFormData();
    this.initialUpdateFormData();
    // เพิม position
    this.positionItems = this.shareds.positionItems;
  }

  form!: FormGroup
  positionItems: any[] = []

  // บันทึกข้อมูล
  onSubmit() {
    if(this.form.invalid) return this.alert.something_wrong('กรุณากรอกข้อมูล');
    // console.log(this.form.value)
    this.account
        .onUpdateProfile(this.authen.getAuthenticated(), this.form.value)
        .then(() => this.alert.notify('แก้ไขข้อมูลสำเร็จ', 'info'))
        .catch(err => this.alert.notify(err.Message));
    // console.log(this.form.value)
  }

  // แปลงไฟล์รูปเป็น base64
  onConvertImage(input: HTMLInputElement) {
    const imageControl = this.form.controls['image'];
    imageControl.setValue(null);
    this.shareds
        .onConvertImage(input)
        .then(base64 => imageControl.setValue(base64))
        .catch(err => {
          input.value = '';
          this.alert.notify(err.Message);
        });
    // const imageTypes = ['image/jpeg', 'image/png'];

    // imageControl.setValue(null);
    // if (input.files?.length == 0) return;

    // // ตรวจสอบชนิดไฟล์อัพโหลด
    // if (imageTypes.indexOf(input.files![0].type) < 0) {
    //     input.value = '';
    //     return this.alert.notify('กรุณาอัพโหลดรูปภาพ jpeg หรือ png เท่านั้น')
    // }

    // const reader = new FileReader();
    // reader.readAsDataURL(input.files![0]);
    // reader.addEventListener('load', () => {
    //   console.log(reader.result);
    //   imageControl.setValue(reader.result);
    // });
  }

  // Open Modal
  openModal(template: TemplateRef<any>) {
   console.log(template);
   this.modalRef = this.modalService.show(template);
  }

  // สร้างฟอร์ม
  private initialCreateFormData() {
      this.form = this.builder.group({
        user: [''],
        firstname: ['', Validators.required],
        lastname: ['', Validators.required],
        position: ['', Validators.required],
        image: [null],
      });
      // disable user
      this.form.get('user')?.disable();
  }

  // load new data with update form data
  private initialUpdateFormData() {
      this.account
        .getUserLogin(this.authen.getAuthenticated())
        .then(user => {
          this.form.controls['user'].setValue(user.user);
          this.form.controls['firstname'].setValue(user.firstname);
          this.form.controls['lastname'].setValue(user.lastname);
          this.form.controls['position'].setValue(user.position);
          this.form.controls['image'].setValue(user.image);

        })
        .catch(err => this.alert.notify(err.Message));
  }
}
