import { Injectable } from "@angular/core";
import { AbstractControl } from "@angular/forms";
@Injectable()
export class ValidatorsService {

    // สร้าง validate check password
   comparePassword(passwordFields: string) {
    return function (confirm_password: AbstractControl) {
        if (!confirm_password.parent) return;
        const password = confirm_password.parent.get(passwordFields);
        const passwordSubscribe = password?.valueChanges.subscribe(() => {
            confirm_password.updateValueAndValidity();
            passwordSubscribe?.unsubscribe();
        });
        if(confirm_password.value === password?.value)
          return;
        return { compare: true };
    }
  }

  // Check password pattern
    isPassword(password: AbstractControl) {
        if(password.value == '') return;
        if(/^[A-z0-9]{6,20}$/.test(password.value)) return;
        return { password: true };
    }

  // Check id card pattern
    isIdCard(idcard: AbstractControl) {
      if(idcard.value == '') return;
      if(/^[0-9]{13}$/.test(idcard.value)) return;
      return { idcard: true };
    }
}