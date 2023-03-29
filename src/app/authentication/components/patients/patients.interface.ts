import { PageChangedEvent } from "ngx-bootstrap/pagination";
import { IAccount, IPatient, IRoleAccount } from "src/app/shared/services/account.service";

export interface IPatientsComponent {
    items: IPatients;

    // ส่วนของการค้นหา
    // searchText: string;
    // searchType: IPatientSearchKey;
    // searchTypeItems: IPatientSearchKey[];
    // onSearchItem(): void;

    // pagination limit
    startPage: number;
    limitPage: number;
    onPageChanged(page: PageChangedEvent):any;

    onDeletePatient(item: IPatient):void ;
    onUpdatePatient(item: IPatient):void ;

    UserLogin: IAccount;
    Role: typeof IRoleAccount;
}

export interface IPatients {
    items: IPatient[];
    totalItems: number;
}

export interface IPaTientSearch {
    // searchText?: any;
    // searchType?: any;

    // startPage: number;
    // limitPage: number;
}

export interface IPatientSearchKey {
    // key: string;
    // value: string;
}

// export interface getSearchText {
//     searchText?: any;
//     searchType?: any;
// }