import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Main } from '../_models/Main';
import { AuthService } from '../_services/auth.service';
import { CallCenterService } from '../_services/callCenter.service';

@Injectable()
export class CustomersFileResolver implements Resolve<Main[]> {
    constructor(private call: CallCenterService, private toastr: ToastrService, private auth: AuthService) { }
    resolve(route: ActivatedRouteSnapshot): Observable<Main[]> {
        return this.call.customers(552).pipe(
            catchError((error) => {
                this.toastr.error('Proplem retrieving messages');
                return of(null);
            })
        );
    }
}
