import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../_services/auth.service';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})

export class NavComponent implements OnInit {
  constructor(private router: Router, private toastr: ToastrService, public auth: AuthService) { }
  ngOnInit(): any {
  }
  loggedIn(): any {
    return this.auth.loggedIn();
  }
  logout(): any {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
    this.toastr.info('! تم تسجيل الخروج بنجاح', 'تاكيد', { timeOut: 1500 });
  }
}
