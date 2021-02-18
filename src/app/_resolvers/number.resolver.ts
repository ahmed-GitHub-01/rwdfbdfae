import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Pay } from '../_models/Pay';
import { NumberPhone } from '../_models/NumberPhone';
import { AuthService } from '../_services/auth.service';

@Injectable()
export class NumberResolver implements Resolve<NumberPhone[]>{
    pageNumber = 1;
    pageSize = 3;
    constructor(private auth: AuthService, private route: Router, private toastr: ToastrService) { }
    resolve(route: ActivatedRouteSnapshot): Observable<NumberPhone[]> {
        return this.auth.getNumber(0, this.pageNumber, this.pageSize).pipe(
            catchError(error => {
                this.toastr.error('Proplem retrieving messages numbers');
                return of(null);
            })
        );
    }
}
