import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AuthenService } from 'src/app/services/authen.service';
import { AccountService } from 'src/app/shared/services/account.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { ValidatorsService } from 'src/app/shared/services/validator.service';
import { IChangePasswordComponent } from './change-password.interface';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements IChangePasswordComponent {
  constructor(
    private builder: FormBuilder,
    private alert: AlertService,
    private validators: ValidatorsService,
    private account: AccountService,
    private authen: AuthenService
  ) { 
    this.initialCreateFormData();
  }
  @Input('modalRef') modalRef!: BsModalRef;
  form!:FormGroup;

  // เปลี่ยนรหัสผ่าน
  onSubmit() {
    if(this.form.invalid)
      return this.alert.something_wrong('กรุณากรอกข้อมูลให้ครบถ้วน')
    this.account
      .onChangePassword(this.authen.getAuthenticated(), this.form.value)
      .then(user => {
        this.alert.notify('เปลี่ยนรหัสผ่านสำเร็จ', 'info');
        this.modalRef.hide();
      })
      .catch(err => this.alert.notify(err.Message));

  }

  //สร้างฟอร์ม
  private initialCreateFormData() {
    this.form = this.builder.group({
      old_pass: ['', [Validators.required]],
      new_pass: ['', [Validators.required, this.validators.isPassword]],
      cnew_pass: ['', [Validators.required, this.validators.comparePassword('new_pass')]]
    });
  }
}
