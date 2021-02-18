import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Statment } from '../_models/Statment';
import { AuthService } from '../_services/auth.service';

@Injectable()
export class StatmentResolver implements Resolve<Statment[]>{
    pageNumber = 1;
    pageSize = 5;
    constructor(private auth: AuthService, private route: Router, private toastr: ToastrService) { }
    resolve(route: ActivatedRouteSnapshot): Observable<Statment[]> {
        return this.auth.getStatment(0, this.pageNumber, this.pageSize).pipe(
            catchError(error => {
                this.toastr.error('Proplem retrieving messages statement');
                return of(null);
            })
        );
    }
}
