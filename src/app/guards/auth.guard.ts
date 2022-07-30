import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  loginFlag: string = '';
  canActivate(): boolean {
    this.loginFlag = localStorage.getItem('token')!;
    //Check if you are logged in by checking local storage
    //for existance of token key
    if (this.loginFlag) {
      //Unlocks route if user logged in
      return true;
    } else {
      //Navigate to login if you don't have permission (not logged in)
      this._router.navigate(['/auth/login']);
      return false;
    }
  }
  constructor(private _router: Router) {}
}
