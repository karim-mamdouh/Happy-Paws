import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoggedInGuard implements CanActivate {
  private _token: string = '';
  canActivate(): boolean {
    this._token = localStorage.getItem('token')!;
    if (this._token) {
      this._router.navigate(['/']);
      return false;
    } else {
      return true;
    }
  }
  constructor(private _router: Router) {}
}
