import { Injectable } from "@angular/core";
@Injectable({
    providedIn: 'root'
})
export class AuthenService {
    private accessKey = 'accessToken';


    // กำหนดค่า access token ไว้ในความจำ browser
    setAuthenticated(accessToken: string): void {
        localStorage.setItem(this.accessKey, accessToken);
    }

    // ดึงค่า access token ในความจำ browser ออกมา
    getAuthenticated(): any {
        return localStorage.getItem(this.accessKey)
        // console.log(localStorage.getItem(this.accessKey))
    }

    // ล้างค่า access token 
    clearAuthenticated(): void {
        localStorage.removeItem(this.accessKey);
    }
}