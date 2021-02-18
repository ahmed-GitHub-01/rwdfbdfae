import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Anotherfile } from '../_models/anotherfile';
import { AutoNumber } from '../_models/autoNumber';
import { CallCenterService } from '../_services/callCenter.service';

@Injectable()
export class AutoNumberResolver implements Resolve<AutoNumber[]>{
    pageNumber = 1;
    pageSize = 5;
    constructor(private auth: CallCenterService, private route: Router, private toastr: ToastrService) { }
    resolve(route: ActivatedRouteSnapshot): Observable<AutoNumber[]> {
        return this.auth.getAutoNumber(0, this.pageNumber, this.pageSize).pipe(
            catchError(error => {
                this.toastr.error('Proplem retrieving messages Another File');
                return of(null);
            })
        );
    }
}
