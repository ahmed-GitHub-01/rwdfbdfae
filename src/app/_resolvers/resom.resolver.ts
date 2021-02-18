import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Resom } from '../_models/resom';
import { CallCenterService } from '../_services/callCenter.service';

@Injectable()
export class ResomResolver implements Resolve<Resom[]>{
    pageNumber = 1;
    pageSize = 5;
    constructor(private auth: CallCenterService, private route: Router, private toastr: ToastrService) { }
    resolve(route: ActivatedRouteSnapshot): Observable<Resom[]> {
        return this.auth.getResom(0, this.pageNumber, this.pageSize).pipe(
            catchError(error => {
                this.toastr.error('Proplem retrieving messages');
                return of(null);
            })
        );
    }
}
