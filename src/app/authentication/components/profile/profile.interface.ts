import { TemplateRef } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { BsModalRef } from "ngx-bootstrap/modal";

export interface IProfileComponent {
    positionItems: any[];
    form: FormGroup;
    modalRef: BsModalRef;

    onSubmit(): void;
    onConvertImage(inputFile:HTMLInputElement): void;
    openModal(template:TemplateRef<any>): any;
}

export interface IProfile {
    firstname: string;
    lastname: string;
    position: string;
    image: string;
}