import { Injectable } from "@angular/core";

@Injectable()
export class SharedsService {
    
    sexItems: any[] = [
        'ชาย',
        'หญิง',
      ];

    positionItems: any[] = [
        'พยาบาล'
      ];

    // แปลงไฟล์รูปเป็น base64
  onConvertImage(input: HTMLInputElement) {
    return new Promise((resolve, reject) => {
        const imageTypes = ['image/jpeg', 'image/png'];
        const imageSize = 300;
        // หากไม่มีการอัพโหลดภาพ
        if (input.files?.length == 0)
            return resolve(null);
        // ตรวจสอบชนิดไฟล์อัพโหลด
        if (imageTypes.indexOf(input.files![0].type) < 0) {
            return reject ({Message:'กรุณาอัพโหลดรูปภาพ jpeg หรือ png เท่านั้น'});
        }
        // ตรวจสอบขนาดไฟล์
        if((input.files![0].size / 1024) > imageSize)
            return reject({ Message: `รูปภาพขนาดใหญ่เกินไป กรุณาอัพโหลดรูปภาพขนาดไม่เกิน ${imageSize} KB`});

        const reader = new FileReader();
        reader.readAsDataURL(input.files![0]);
        // คืนค่า image base64 ออกไป
        reader.addEventListener('load', () => {
            resolve(reader.result);
        });
    });
    
  }
}