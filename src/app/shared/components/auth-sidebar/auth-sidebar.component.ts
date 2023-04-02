import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppURL } from 'src/app/app.url';
import { AuthURL } from 'src/app/authentication/authentication.url';
import { AuthenService } from 'src/app/services/authen.service';
import { AccountService, IAccount, IRoleAccount } from '../../services/account.service';
import { AlertService } from '../../services/alert.service';
import { IAuthSidebarComponent } from './auth-sidebar.interface';
declare const App: any;

@Component({
  selector: 'app-auth-sidebar',
  templateUrl: './auth-sidebar.component.html',
  styleUrls: ['./auth-sidebar.component.css']
})
export class AuthSidebarComponent implements OnInit, IAuthSidebarComponent {

  constructor(
    private account: AccountService,
    private authen: AuthenService,
    private alert: AlertService,
    private router: Router
  ) { 
    this.initialLoadUserLogin();
  }

  ngOnInit() {

  }

  AppURL = AppURL;
  AuthURL = AuthURL;
  UserLogin!: IAccount;
  Role = IRoleAccount;

  // โหลดข้อมูล User Login จาก Token
  private initialLoadUserLogin() : any {
    // console.log(this.authen.getAuthenticated())
    this.UserLogin = this.account.UserLogin;
    if(this.UserLogin.id) return setTimeout(() => App.initialLoadPage(), 100);

    this.account
      .getUserLogin(this.authen.getAuthenticated())
      .then(userLogin => {
        this.UserLogin = userLogin;
        
        //โหลดข้อมูล script สำหรับ sidebar
        setTimeout(() => App.initialLoadPage(), 100);
      })
      .catch(err => {
        this.alert.notify(err.Message);
        this.authen.clearAuthenticated();
        this.router.navigate(['/', AppURL.Login]);
      });
  }
}
