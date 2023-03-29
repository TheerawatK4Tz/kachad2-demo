import { FormGroup } from "@angular/forms";

export interface IRegisterComponent {
    form:FormGroup;
    Url: any;
    // onSubmit();
}

export interface IRegister {
    firstname: string;
    lastname: string;
    user: string;
    password: string;
    cpassword: string;
    id?: any;
    registercode: any;
}