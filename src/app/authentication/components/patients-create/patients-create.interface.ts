import { FormGroup } from "@angular/forms";

export interface IPatientsCreateComponent {
    positionItems?:any[];
    sexItems?:any[];
    typesItems?:any[];
    form: FormGroup;

    patientIdCard: any;

    onSubmit(): void;
    onConvertImage(input: HTMLInputElement): void;
}