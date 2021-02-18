import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { StatementSec } from '../_models/statementSec';
import { AuthService } from '../_services/auth.service';
import { CallCenterService } from '../_services/callCenter.service';

@Injectable()
export class StatetmentSecResolver implements Resolve<StatementSec[]>{
    pageNumber = 1;
    pageSize = 5;
    constructor(private call: CallCenterService, private route: Router, private toastr: ToastrService) { }
    resolve(route: ActivatedRouteSnapshot): Observable<StatementSec[]> {
        return this.call.getStatmentSec(0, this.pageNumber, this.pageSize).pipe(
            catchError(error => {
                this.toastr.error('Proplem retrieving messages sec statement');
                return of(null);
            })
        );
    }
}
