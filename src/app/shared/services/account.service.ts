import { DATE_PIPE_DEFAULT_OPTIONS } from "@angular/common";
import { Injectable } from "@angular/core";
import { IChangePassword } from "src/app/authentication/components/profile/change-password/change-password.interface";
import { IProfile } from "src/app/authentication/components/profile/profile.interface";
import { ILogin } from "src/app/components/login/login.interface";
import { IRegister } from "src/app/components/register/register.interface";
import { AuthenService } from "src/app/services/authen.service";
import { HttpService } from "src/app/services/http.service";
@Injectable({
    providedIn: 'root'
})
export class AccountService {
    constructor(
        private http:HttpService,
        private authen: AuthenService,
        
      ) { }

    public mockUserItems: IAccount[] = [
        {
            id: 1,
            firstname: 'Employee',
            lastname: 'ไทยใหม่',
            user: 'karuna',
            password: '123123',
            position: 'พยาบาล',
            image: 'https://scontent.fbkk5-3.fna.fbcdn.net/v/t1.6435-9/53142654_1862473343857231_7290621154333556736_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=KxTmgu-s_psAX9GefPr&_nc_ht=scontent.fbkk5-3.fna&oh=00_AfDRyCu7-yGl3xGVyf1ODdIS-pVL4bMA56YWj1ikLstB2A&oe=6437857B',
            created: new Date(),
            role: IRoleAccount.Employee,
            updated: new Date()
        },
        {
            id: 2,
            firstname: 'Admin',
            lastname: 'กันธะวัง',
            user: 'boss',
            password: '123123',
            position: 'พยาบาล',
            role: IRoleAccount.Admin,
            // image: 'https://scontent.fbkk5-3.fna.fbcdn.net/v/t1.6435-9/53142654_1862473343857231_7290621154333556736_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=KxTmgu-s_psAX9GefPr&_nc_ht=scontent.fbkk5-3.fna&oh=00_AfDRyCu7-yGl3xGVyf1ODdIS-pVL4bMA56YWj1ikLstB2A&oe=6437857B',
            created: new Date(),
            updated: new Date()
        },
        {
            id: 3,
            firstname: 'Member',
            lastname: 'test',
            user: 'test',
            password: '123123',
            position: 'พยาบาล 10',
            role: IRoleAccount.Member,
            // image: 'https://scontent.fbkk5-3.fna.fbcdn.net/v/t1.6435-9/53142654_1862473343857231_7290621154333556736_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=KxTmgu-s_psAX9GefPr&_nc_ht=scontent.fbkk5-3.fna&oh=00_AfDRyCu7-yGl3xGVyf1ODdIS-pVL4bMA56YWj1ikLstB2A&oe=6437857B',
            created: new Date(),
            updated: new Date()
        }
    ];

    public mockPatientsItems: IPatient[] = [
        {
            firstname: 'ธีระวัฒน์',
            lastname: 'กันธะวัง',
            sex: 'ชาย',
            age: '20',
            idcard: '1231231231231',
            type: 'มีสิทธิ',
            opd: '1/60',
            created: new Date(),
            image: '',
            image2: ''
        },
        {
            firstname: 'สมหมี',
            lastname: 'มีหอย',
            sex: 'หญิง',
            age: '30',
            idcard: '9876543210987',
            type: 'มีสิทธิ',
            opd: '2/60',
            created: new Date(),
            image: '',
            image2: ''
        }
    ]

    // store user login ไว้
    public UserLogin: IAccount = {} as any;
    public setUserLogin(userLogin: IAccount) { 
        this.UserLogin.id = userLogin.id;
        this.UserLogin.firstname = userLogin.firstname;
        this.UserLogin.lastname = userLogin.lastname;
        this.UserLogin.image = userLogin.image;
        this.UserLogin.password = userLogin.password;
        this.UserLogin.position = userLogin.position;
        this.UserLogin.role = userLogin.role;
        this.UserLogin.user = userLogin.user;
        this.UserLogin.created = userLogin.created;
        this.UserLogin.updated = userLogin.updated;
        return this.UserLogin;
    }

    //เปลี่ยนรหัสผ่านใหม่
    onChangePassword(accressToken: string, model:IChangePassword) {
        return new Promise((resolve, reject) => {
            const userProfile = this.mockUserItems.find(item => item.id == accressToken);
            if(!userProfile) return reject({ Message: 'ไม่มีข้อมูลผู้ใช้งาน' });
            if(userProfile.password !== model.old_pass) return reject({Message: 'รหัสผ่านเดิมไม่ถูกต้อง'});
        userProfile.password = model.new_pass;
        userProfile.updated = new Date();
        resolve(userProfile);
        });

    }

    // แก้ไขข้อมูลส่วนตัว Update profile
    onUpdateProfile(accessToken: string, model: IProfile) {
        // console.log(model)
        return (this.http
                    .requestPost('api/updateprofile', model, accessToken)
                    .toPromise() as Promise<IAccount>)
                    .then(user => this.setUserLogin(user));
        // โมเดลเก่า
        // return new Promise((resolve, reject) => {
        //     const userProfile = this.mockUserItems.find(user => user.id == accressToken);
        //     if(!userProfile) return reject ({ Message: 'ไม่มีผู้ใช้งานนี้ในระบบ' });
        //     userProfile.firstname = model.firstname;
        //     userProfile.lastname = model.lastname;
        //     userProfile.position = model. position;
        //     userProfile.image = model.image;
        //     userProfile.updated = new Date();
        //     resolve(userProfile);
        // });
    }

    // ดึงข้อมูลผู้ที่เข้าสู่ระบบ จาก token
    getUserLogin(accessToken: string){
        return (this.http
                    .requestPost('api/get-member', accessToken)
                    .toPromise() as Promise<IAccount>)
                    .then(userLogin => this.setUserLogin(userLogin));
        // โมเดลเก่า
        // return new Promise<IAccount>((resolve, reject) => {
        //     // console.log(this.mockUserItems.find((m => m.id)));
        //     const accessToken  = this.authen.getAuthenticated()
        //     const userLogin = this.mockUserItems.find(m => m.id == accessToken);
        //     // console.log(accessToken);
        //     if(!userLogin) return reject({Message: 'accessToken Denied'}); 
            
        //     resolve(userLogin);
        // });
    }

    // เข้าสู่ระบบ
    onLogin(model: ILogin){
        return this.http
                    .requestPost('api/login', model)
                    .toPromise() as Promise<{ accessToken: string }>
        // โมเดลเก่า
        // return new Promise<{ accessToken: string }>((resolve, reject) => {
        //     const userLogin = this.mockUserItems.find(item => item.user == model.user && item.password == model.password);
        //     if(!userLogin) return reject({Message: 'ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง'});
        //     console.log(userLogin.id)
        //     resolve({
        //         accessToken: userLogin.id
        //     });
        //     // console.log(userLogin);
        //     // resolve(model);
        // });
    }

    // ลงทะเบียน
    onRegister(model: IRegister) {
        return this.http
        .requestPost('api/register', model)
        .toPromise() as Promise<IAccount>;
        // console.log(model);
        // โมเดลเก่า ไว้ใช้กับ front
        // return new Promise((resolve, reject) => {
        //     const _model: IAccount = model;
        //     _model.id = Math.random();
        //     _model.image = '';
        //     _model.role = IRoleAccount.Member;
        //     _model.created = new Date();
        //     _model.updated = new Date();
        //     model['id'] = Math.random();
        //     this.mockUserItems.push(model);
        //     resolve(model);
        //     // reject({Message: 'Error from service'});
        // });
        // console.log(model)
    }

}

export interface IAccount {
    firstname?: string;
    lastname?: string;
    user?: string;
    password?: string;

    id?: any;
    position?: string;
    image?: string;
    role?: IRoleAccount;
    created?: Date;
    updated?: Date;
}

export interface IPatient {
    firstname?: any;
    lastname?: any;
    sex?: any;
    age?: any;
    idcard?: any;
    type?: any;
    opd?: any;
    created? : any;
    updated? : any;
    image?: any;
    image2?: any;
    birthdate?: any;
    detail?: any;

}

export enum IRoleAccount {
    Member = 1,
    Employee,
    Admin
}