import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../_services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }
  canActivate(): boolean {
    if (this.authService.loggedIn()) {
      return true;
    }
    this.toastr.error('يجب تسجل الدخول');
    this.router.navigate(['/login']);
    return false;
  }
}
