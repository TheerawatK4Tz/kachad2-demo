import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenService } from '../services/authen.service';
import { AccountService, IRoleAccount } from '../shared/services/account.service';

@Injectable({
  providedIn: 'root'
})
export class UserRoleGuard implements CanActivate {
  constructor(
    private authen: AuthenService,
    private account: AccountService
  ) {  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return new Promise<boolean>((resolve, reject) => {
        const roles: IRoleAccount[] = next.data['roles'];
        this.account
            .getUserLogin(this.authen.getAuthenticated())
            .then((userLogin) => {
              if(roles.filter(item => item == userLogin.role).length > 0)
                resolve(true);
              else
                resolve(false);
            })
            .catch(() => resolve(false));
        // resolve(false);
      });
  }
}
