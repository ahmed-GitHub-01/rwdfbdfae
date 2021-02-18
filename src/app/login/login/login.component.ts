import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  model: any = {};
  constructor(private auth: AuthService, private route: Router, private toastr: ToastrService) { }

  // tslint:disable-next-line:typedef
  ngOnInit() { }
  // tslint:disable-next-line:typedef
  login() {
    this.auth.login(this.model).subscribe(
      (next) => {
      },
      (error) => {
        this.toastr.error(error);
      },
      () => {
        this.route.navigate(['/profile']);
      }
    );
  }
}
