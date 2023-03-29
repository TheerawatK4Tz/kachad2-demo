import { Injectable } from "@angular/core";
declare let $: any;
declare const swal: any;
@Injectable()
export class AlertService{

    notify(message: string, type: string = 'warning'){
        swal({
            title: "แจ้งเตือน",
            text: message,
            type: type,
            closeOnCancel: false,
            confirmButtonText: "ตกลง",
            // showCancelButton: true,
            
          });
          // , function(isConfirm: any) {
          //   if (isConfirm) {
          //     swal("Deleted!", "Your imaginary file has been deleted.", "success");
          //   } else {
          //     swal("Cancelled", "Your imaginary file is safe :)", "error");
          //   }
          // });
        // $.notify({
        //   title: "Update Complete : ",
        //   message: "Something cool is just updated!",
        //   icon: 'fa fa-check' 
        // },{
        //   type: "info"
        // });
      }

      something_wrong(message: string = 'มีบางอย่างไม่ถูกต้อง', type: string = 'warning'){
          this.notify(message)

      }

      // confirm notify
      confirm(message: string = 'คุณต้องการลบข้อมูลคนไข้รายนี้ใช่หรือไม่?'):Promise<any> {
        return swal(message, {
          buttons: ["ยกเลิก", "ยืนยัน, ลบข้อมูล"],
          dangerMode: true
        });
        // return swal({
        //   title: message,
        //   text: "ข้อมูลคนไข้คนนี้จะหายไป",
        //   type: "warning",
        //   showCancelButton: true,
        //   confirmButtonColor: "#DD6B55",
        //   confirmButtonText: "ตกลง, ลบข้อมูล",
        //   closeOnConfirm: false
        // }
        //   function () {
        //     swal("ลบข้อมูลสำเร็จ!");
        //   });
        
        // swal({
        //   title: "แจ้งเตือน",
        //   text: message,
        //   closeOnCancel: false,
        //   confirmButtonText: "ตกลง",
        //   showCancelButton: true,
        //  function(isConfirm: any) {
        //   if (isConfirm) {
        //     swal("Deleted!", "Your imaginary file has been deleted.", "success");
        //   } else {
        //     swal("Cancelled", "Your imaginary file is safe :)", "error");
        //   }
        // }
        // });

      // $.notify({
      //   title: "Update Complete : ",
      //   message: "Something cool is just updated!",
      //   icon: 'fa fa-check' 
      // },{
      //   type: "info"
      //  });
      }

      reloadPage(){
        window.location.reload()
      }
}