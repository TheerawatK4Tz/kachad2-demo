import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http"
import { catchError } from 'rxjs/operators';
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class HttpService {
    constructor(private http: HttpClient) {
    }

    private address: string = 'http://localhost:8081/';
    // private address: string = 'https://kachad-fah-87ll0x.5sc6y6-4.usa-e2.cloudhub.io/';

    // ส่งข้อมูลแบบ Get method
    requestGet(url: string, accessToken?: string ) { 
        // console.log(accessToken)
        return this.http
                    .get(`${this.address}${url}`, {
                        headers: this.appendHeaders(accessToken)
                    })
                    // .pipe(catchError(err => this.handleError(err)));
    }

    // ส่งข้อมูลแบบ Post method
    requestPost(url: string, body: any, accessToken?: string) { 
        return this.http
                    .post(`${this.address}${url}`, body, {
                        headers: this.appendHeaders(accessToken)
                    })
                    // .pipe(catchError(err => this.handleError(err)));
    }

    // ปรับแต่ง Error ใหม่
    // private handleError(errResponse: HttpErrorResponse => any): Observable<any> {
    //     errResponse['Message'] = errResponse.message;
    //     throw errResponse;
    // }

    // เพิ่ม header
    private appendHeaders(accessToken: any) {
        let headers = {};
        if (accessToken) headers = accessToken;
        // console.log(new HttpHeaders(headers));
        // console.log(headers)
        return new HttpHeaders(headers);
    }

}