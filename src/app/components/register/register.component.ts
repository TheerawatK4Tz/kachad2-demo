import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppURL } from 'src/app/app.url';
import { AccountService } from 'src/app/shared/services/account.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { ValidatorsService } from 'src/app/shared/services/validator.service';
import { IRegisterComponent } from './register.interface';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements IRegisterComponent {

  constructor(
    private builder: FormBuilder,
    private alert: AlertService,
    private account: AccountService,
    private router: Router,
    private validators: ValidatorsService
  ) { 
    this.initialCreateFormData();
  }

  Url = AppURL
  form!: FormGroup;

  //ลงทะเบียน
  onSubmit() {
    if(this.form.invalid) {
      return this.alert.notify('ข้อมูลบางอย่างผิดพลาด');
      // return alert('กรุณากรอกข้อมูล ให้ครบถ้วน')
  }
    // console.log(this.form.valid);
    this.account
        .onRegister(this.form.value)
        .then(res => {
          this.alert.notify('ลงทะเบียนสำเร็จ', 'info');
          this.router.navigate(['/', AppURL.Login]);
        })
        .catch(err => 
          {
            this.alert.notify(err.error.Message)
          })
}

  private initialCreateFormData() {
    // สร้างฟอร์ม
    this.form = this.builder.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      user: ['', [Validators.required]],
      password: ['', [Validators.required, this.validators.isPassword]],
      cpassword: ['', [Validators.required, this.validators.comparePassword('password')]],
      registercode: ['', [Validators.required]]
    });
  }
}
