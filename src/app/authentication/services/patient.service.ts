import { Injectable } from "@angular/core";
import { AuthenService } from "src/app/services/authen.service";
import { HttpService } from "src/app/services/http.service";
import { AccountService, IAccount, IPatient } from "src/app/shared/services/account.service";
import { IPatients, IPaTientSearch } from "../components/patients/patients.interface";
@Injectable()
export class PatientService {    
    constructor(
        private account: AccountService,
        private http: HttpService,
        private authen: AuthenService
        ) 
        {  
            // ดึงจำลองข้อมูลคนไข้
            // if(this.account.mockPatientsItems.length <= 2)
            //     this.generatePatients();
        }

    // ดึงข้อมูลคนไข้ทั้งหมด
    getPatients(options?: IPaTientSearch) {
        return this.http
                    .requestGet('api/get-patients', this.authen.getAuthenticated())
                    .toPromise() as Promise<IPatients>;


        // โมเดลเก่า
        // return new Promise<IPatients>((resolve, reject) => {
        //     // เรียงลำดับข้อมูลใหมจาก วันที่แก้ไขล่าสุด
        //     // let items = this.account.mockPatientsItems;
        //     let items = this.account.mockPatientsItems.sort((a, b) => {
        //         return <any>new Date(b.created) - <any>new Date(a.created);
        //       });;

        //     // คำนวณ pagination
            // const startItem = (options!.startPage - 1) * options!.limitPage;
            // const endItem = options!.startPage * options!.limitPage;
            // console.log(search);
            // console.log(options?.searchType);
            
        //     // หากมีการค้นหาข้อมูล
        //     if(options && options?.searchText && options?.searchType) {
        //         // ค้นหาข้อมูลมาเก็บไว้ในตัวแปร items
        //             items = this.account
        //             .mockPatientsItems
        //             .filter((item:any) => {
        //                 switch (options.searchType) {
        //                     case 'created':
        //                         return item.created >= options.searchText['from'] && item.created <= options.searchText['to'];
        //                 }
        //             return item[options?.searchType].toString().toLowerCase().indexOf(options?.searchText.toString()) >= 0
        //             });
        //     }
        //     resolve({ items: items.slice(startItem, endItem), totalItems: items.length });
        // });
    }

    // จำลองข้อมูลคนไข้ เพื่อทำ pagination
    // private generatePatients() {
    //     const types = ['มีสิทธิ', 'ไม่มีสิทธิ']
    //     const sexs = ['ชาย', 'หญิง']
    //     // this.account.mockPatientsItems.splice(2);
    //     for(let i = 3; i <= 20; i++)
    //         this.account.mockPatientsItems.push({
    //             firstname: `Firstname ${i}`,
    //             lastname: `Lastname ${i}`,
    //             sex: sexs[Math.round(Math.random() *1)],
    //             age: i.toString(),
    //             idcard: 120321020312 + i,
    //             type: types[Math.round(Math.random() *1)],
    //             opd: `${i} /333`,
    //             created: new Date(2023, 2, Math.random() * 19 +1),
    //             updated: new Date()
    //         })
    // }


    // เพิ่มข้อมูลคนไข้
    createPatient(model: IPatient) {
        return this.http.requestPost('api/create-patient', model, this.authen.getAuthenticated())
                    .toPromise() as Promise<IPatient>;

        // return new Promise<IPatient>((resolve, reject) => {
        //     if(this.account.mockPatientsItems.find(item => item.idcard == model.idcard))
        //         return reject({ Message: 'เลขบัตรประชาชนนี้มีอยู่ในระบบแล้ว' })
        //     model.idcard = model.idcard ;
        //     model.created = new Date().toLocaleString();
        //     model.updated = new Date().toLocaleString()
        //     this.account.mockPatientsItems.push(model);
        //     resolve(model);
        // });

    }

    // ลบข้อมูลคนไข้
    deletePatient(idcard: any) {
        return this.http
                    .requestPost('api/delete-patient', idcard, this.authen.getAuthenticated())
                    .toPromise() as Promise<{ number:any }>
        // return new Promise((resolve, reject) => {
        //     const findIndex = this.account.mockPatientsItems.findIndex(item => item.idcard == idcard);
        //     if(findIndex < 0) return reject({ Message: 'ไม่มีข้อมูลนี้ในระบบ' });
        //     resolve(this.account.mockPatientsItems.splice(findIndex, 1));
        // });
    }

    // ดึงข้อมูลคนไข้ 1 คน
    getPatientById(idcard: any) {
        return this.http
                    .requestGet(`api/get-patient-id/${idcard}`)
                    .toPromise() as Promise<IPatient>;
        // return new Promise<IPatient>((resolve, reject) => {
        //     const patient = this.account.mockPatientsItems.find(item => item.idcard == idcard);
        //     if (!patient) return reject({ Message: 'ไม่มีข้อมูลคนไข้ในระบบ' });
        //     resolve(patient);
        // });
    }

    // แก้ไขข้อมูลสมาชิก
    updatePatient(idcard: any, model: IPatient) {
        return this.http
                    .requestPost('api/update-patient', model)
                    .toPromise() as Promise<IPatient>;

        // return new Promise<IPatient>((resolve, reject) => {
        //     const patient = this.account.mockPatientsItems.find(item => item.idcard == idcard);
        //     if(!patient) return reject({ Message: 'ไม่มีข้อมูลสมาชิกในระบบ' });
        //     // ตรวจเลขบัตรประชาชนในระบบ
        //     if (this.account.mockPatientsItems.find(item => {
        //         return item.idcard == model.idcard && model.idcard != patient.idcard;
        //     })) return reject({ Message: 'มีเลขบัตรประชาชนนี้อยู่ในระบบแล้ว' });

        //     patient.opd = model.opd || patient.opd;
        //     patient.idcard = model.idcard || patient.idcard;
        //     patient.firstname = model.firstname || patient.firstname;
        //     patient.lastname = model.lastname || patient.lastname;
        //     patient.type = model.type || patient.type;
        //     patient.age = model.age || patient.age;
        //     patient.sex = model.sex || patient.sex;
        //     patient.image = model.image || patient.image;
        //     patient.image2 = model.image2 || patient.image2;
        //     patient.updated = new Date().toLocaleString;
        //     resolve(patient);
        // });
    }
}