import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { AppURL } from 'src/app/app.url';
import { AlertService } from 'src/app/shared/services/alert.service';
import { SharedsService } from 'src/app/shared/services/shareds.service';
import { ValidatorsService } from 'src/app/shared/services/validator.service';
import { AuthURL } from '../../authentication.url';
import { PatientService } from '../../services/patient.service';
import { IPatientsCreateComponent } from './patients-create.interface';

@Component({
  selector: 'app-patients-create',
  templateUrl: './patients-create.component.html',
  styleUrls: ['./patients-create.component.css'],
  providers: [PatientService]
})
export class PatientsCreateComponent implements IPatientsCreateComponent {
  constructor(
    private shareds:SharedsService,
    private builder: FormBuilder,
    private alert: AlertService,
    private patient: PatientService,
    private router: Router,
    private validators: ValidatorsService,
    private activatedRouter: ActivatedRoute,
    private localeService: BsLocaleService
  ) {  
    // เปลี่ยน date picker เป็นภาษาไทย
    this.localeService.use('th')
    
    // รับ query param
    this.activatedRouter.params.forEach(params => {
        // console.log(params)
        this.patientIdCard = params['idcard'];
    });
    // console.log(this.patientIdCard)

    this.initialCreateFormData();
    this.initialUpdateFormData();

    // เพิ่ม sex 
    this.sexItems = this.shareds.sexItems;
  }
  positionItems?: any[];

  form!: FormGroup;
  patientIdCard: any;
  typesItems!: any[];
  sexItems!: any[];
  
  // สร้างฟอร์ม
  private initialCreateFormData() {
    this.form = this.builder.group({
        opd: ['', Validators.required],
        idcard: ['', [Validators.required, this.validators.isIdCard]],
        firstname: ['', Validators.required],
        lastname: ['', Validators.required],
        type: ['', Validators.required],
        birthdate: [''],
        sex: ['', Validators.required],
        image: [],
        image2: [],
        created: (new Date())
    });
  }

  // บันทึกข้อมูล หรือ แก้ไขข้อมูล
  onSubmit(): void {
    if((this.form.value.idcard).length != 13)
      return this.alert.something_wrong('กรุณากรอกเลขบัตรประชาชนให้ครบ 13 หลัก')
    if(this.form.invalid)
      return this.alert.something_wrong('กรุณากรอกข้อมูลให้ครบถ้วน หรือ มีข้อมูลบางอย่างผิดพลาด')

    // หากเป็นการเพิ่มคนไข้
    if(!this.patientIdCard)
      {
        this.patient
        .createPatient(this.form.value)
        .then(res => {
          this.alert.notify('บันทึกข้อมูลสำเร็จ', 'info');
          this.router.navigate(['/', AppURL.Authen, AuthURL.Patients]);

        })
        .catch(err => this.alert.notify(err.error.Message));
        console.log(this.form.value);
      }
    // หากเป็นการ แก้ไขคนไข้
    else {
      this.patient
          .updatePatient(this.patientIdCard, this.form.value)
          .then(res => {
            console.log(res);
            this.alert.notify('แก้ไขข้อมูลสำเร็จ', 'info');
            this.router.navigate(['/', AppURL.Authen, AuthURL.Patients]);
          })
          .catch(err => this.alert.notify(err.error.Message));
    }
  }

  // แสดงตัวอย่างภาพอัพโหลด 1
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
  }

  // แสดงตัวอย่างภาพอัพโหลด 2
  onConvertImage2(input2: HTMLInputElement) {
    const imageControl = this.form.controls['image2'];
    imageControl.setValue(null);
    this.shareds 
        .onConvertImage(input2)
        .then(base64 => imageControl.setValue(base64))
        .catch(err => {
          input2.value = '';
          this.alert.notify(err.Message);
        });
  }

  // แก้ไข ฟอร์ม
  private initialUpdateFormData() {
      // if(!this.patientIdCard) return;
      // const patient = this.patient.getPatients
      this.patient
          .getPatientById(this.patientIdCard)
          .then(patient => {
            // นำข้อมูลมาใส่ ฟอร์ม
            // console.log("----------console--------")
            // console.log(patient)
            const form = this.form;
            form.controls['opd'].setValue(patient.opd);
            form.controls['idcard'].setValue(patient.idcard);
            form.controls['firstname'].setValue(patient.firstname);
            form.controls['lastname'].setValue(patient.lastname);
            form.controls['type'].setValue(patient.type);
            form.controls['birthdate'].setValue(patient.birthdate);
            form.controls['sex'].setValue(patient.sex);
            form.controls['image'].setValue(patient.image);
            form.controls['image2'].setValue(patient.image2);
          })
          .catch(err => {
            // console.log("--------error--------")
            // console.log(this.patient)
            this.alert.notify(err.error);
            this.router.navigate(['/', AppURL.Authen, AuthURL.Patients]);
          });
  }
}
