import { ArrayType, ThisReceiver } from '@angular/compiler';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { AppURL } from 'src/app/app.url';
import { AuthenService } from 'src/app/services/authen.service';
import { AccountService, IAccount, IPatient, IRoleAccount } from 'src/app/shared/services/account.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { AuthURL } from '../../authentication.url';
import { PatientService } from '../../services/patient.service';
import { IPatients, IPatientsComponent, IPaTientSearch, IPatientSearchKey } from './patients.interface';

import { Pipe, PipeTransform } from '@angular/core';
// declare let swal: (arg0: string) => void;


@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css'],
  providers: [PatientService]
})
export class PatientsComponent implements IPatientsComponent {
    constructor(
      private patient: PatientService,
      private alert: AlertService,
      private detect: ChangeDetectorRef,
      private router: Router,
      private activatedRouter: ActivatedRoute,
      private localeService: BsLocaleService,
      private authen: AuthenService,
      private account: AccountService
    ) { 
      //เปลี่ยน Datepicker เป็นภาษาไทย
      this.localeService.use('th');
      //โหลดข้อมูลคนไข้
      this.initialLoadPatients({
        startPage: this.startPage,
        limitPage: this.limitPage
      });

      //กำหนดค่าเริ่มต้นให้กับ searchType
      this.searchType = this.searchTypeItems[0];
      // โหลด user login
      this.initialLoadUserLogin();
    }

    items!: IPatients;


    // variable for search
    // searchText: any = '';
    searchType!: IPatientSearchKey;
    searchTypeItems: IPatientSearchKey[] = [
        { key: 'firstname', value: 'ค้นหาจากชื่อ' },
        { key: 'lastname', value: 'ค้นหาจากนามสกุล' },
        { key: 'sex', value: 'ค้นหาจากเพศ' },
        { key: 'age', value: 'ค้นหาจากอายุ' },
        { key: 'idcard', value: 'ค้นหาจากเลขบัตรประชาชน' },
        { key: 'type', value: 'ค้นหาจากสิทธิ' },
        { key: 'opd', value: 'ค้นหาจากOPD' },
        { key: 'created', value: 'ค้นหาจากวันที่แอดมิท' },
    ];

    // ตัวแปร pagination
    startPage: number = 1;
    limitPage: number = 9;
    posts:any;
    p: number = 1;
    searchText:any;

    // ตรวจสอบผู้ใช้งาน
    UserLogin!: IAccount;
    Role = IRoleAccount;

    //เปลี่ยนหน้า pagiantion
    onPageChanged(page: PageChangedEvent) {
      this.initialLoadPatients({
          // searchText: this.getSearchText,
          // searchType: this.searchType.key,
          startPage: page.page,
          limitPage: page.itemsPerPage
      });
    }

    //ค้นหาข้อมูล
    // onSearchItem() {
    //   // console.log(this.getSearchText)
    //   this.startPage = 1;
    //   this.initialLoadPatients({
    //       searchText: this.getSearchText,
    //       searchType: this.searchType.key,
    //       startPage: this.startPage,
    //       limitPage: this.limitPage
    //   });
    //   // กระตุ้น event
    //   this.detect.detectChanges();
    //   // console.log(this.searchText, this.searchType)
    // }

    //Get Role คลิปที่ 37
    // ตรวจสอบ และ return ค่า searchText
    // private get getSearchText() {
    //   let responseSearchText = null;
    //   switch (this.searchType.key) {
    //     case 'role':
    //         responseSearchText = IRoleAccount[this.searchText] || '';
    //         break;
    //     case 'created':
    //       try {
    //         const searchDate: { from: Date, to: Date } = { from: this.searchText[0], to: this.searchText[1] };
    //         if (searchDate.from == undefined || searchDate.to == undefined)
    //             return this.alert.notify('กรุณากรอกข้อมูลวันที่', 'warning');
    //         searchDate.from.setHours(0);
    //         searchDate.from.setMinutes(0);
    //         searchDate.from.setSeconds(0);
    //         searchDate.to.setHours(23);
    //         searchDate.to.setMinutes(59);
    //         searchDate.to.setSeconds(59);
    //         responseSearchText = searchDate;
    //       }
    //       catch (ex) {
    //           this.alert.notify(`เกิดข้อผิดพลาด : ${ex}`, 'warning' )
    //       }
    //         break;
    //     default:
    //         responseSearchText = this.searchText;
    //         break;
    //   }
    //   return responseSearchText;
    // }

    // ลบข้อมูลคนไข้
    onDeletePatient(item: IPatient) {
      this.alert.confirm().then(status => {
        if (!status) return;
        this.patient
            .deletePatient(item.idcard)
            .then(() => {
              //  โหลดข้อมูลคนไข้ใหม่
              // this.initialLoadPatients({
              //   searchText: this.searchText,
              //   searchType: this.searchType.key,
              //   startPage: this.startPage,
              //   limitPage: this.limitPage
              // });
              // console.log(this.items)
              this.alert.notify('ลบข้อมูลสำเร็จ', 'info')
              this.wait(2000)
              // this.reloadPage()
            })
            .catch(err => this.alert.notify((err.Message)))
      });
    }

    // แก้ไขข้อมูลคนไข้
    onUpdatePatient(item: IPatient) {
      // this.alert.notify(item.idcard);
      this.router.navigate(['', 
          AppURL.Authen,
          AuthURL.PatientsCreate,
          item.idcard
          // { idcard: item.idcard }
    ])
    }

    // load patients data
    private initialLoadPatients(options?: IPaTientSearch) {
      this.patient
          .getPatients(options)
          .then(items => {
            this.items = items;
            console.log(items);
          })
          .catch(err => this.alert.notify(err.Message));
    }

    // โหลดข้อมูลผู้ใช้ที่ยังไม่ Login
    private initialLoadUserLogin() {
      this.UserLogin = this.account.UserLogin;
      this.account
          .getUserLogin(this.authen.getAuthenticated())
          .then(userLogin => this.UserLogin = userLogin)
          .catch(err => this.alert.notify(err.Message));
    }

    reloadPage(){
      window.location.reload()
    }

    wait(ms:any){
      var start = new Date().getTime();
      var end = start;
      while(end < start + ms) {
        end = new Date().getTime();
     }
   }
}
