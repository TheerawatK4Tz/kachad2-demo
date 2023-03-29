import { FormGroup } from "@angular/forms";
import { BsModalRef } from "ngx-bootstrap/modal";

export interface IChangePasswordComponent {
    modalRef: BsModalRef;
    form:FormGroup;

    onSubmit(): void;
    
}

export interface IChangePassword {
    old_pass: string,
    new_pass: string,
}