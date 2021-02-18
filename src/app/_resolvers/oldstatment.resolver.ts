import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { OldStatment } from '../_models/OldStatment';
import { AuthService } from '../_services/auth.service';

@Injectable()
export class OldStatmentResolver implements Resolve<OldStatment[]>{
    pageNumber = 1;
    pageSize = 5;
    constructor(private auth: AuthService, private route: Router, private toastr: ToastrService) { }
    resolve(route: ActivatedRouteSnapshot): Observable<OldStatment[]> {
        return this.auth.getOldStatment(0, this.pageNumber, this.pageSize).pipe(
            catchError(error => {
                this.toastr.error('Proplem retrieving messages old Statement');
                return of(null);
            })
        );
    }
}
