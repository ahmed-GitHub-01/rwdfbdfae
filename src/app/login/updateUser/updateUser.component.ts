import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-updateuser',
  templateUrl: './updateUser.component.html',
  styleUrls: ['./updateUser.component.css']
})
export class UpdateUserComponent implements OnInit {
  constructor(private fb: FormBuilder, private auth: AuthService, private toastr: ToastrService) { }
  updateForm: FormGroup;
  user: any;
  ngOnInit(): any {
    this.updateForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]),
      confirmPassword: new FormControl('', Validators.required)
    }, this.passwordMatchValidator);
  }
  createUpdateForm(): any {
    this.updateForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }
  passwordMatchValidator(g: FormGroup): any {
    return g.get('password').value === g.get('confirmPassword').value ? null : { misMatch: true };
  }
  updateUser(): void {
    this.user = Object.assign({}, this.updateForm.value);
    this.auth.updateUser(this.user, this.user.username).subscribe(() => {
      this.toastr.success('User has been updated !');
    }, error => {
      this.toastr.error('User hasnot been updated !');
    });
  }
}
