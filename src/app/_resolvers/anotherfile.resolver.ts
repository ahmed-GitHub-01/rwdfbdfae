import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Anotherfile } from '../_models/anotherfile';
import { AuthService } from '../_services/auth.service';

@Injectable()
export class AnotherFileResolver implements Resolve<Anotherfile[]>{
    pageNumber = 1;
    pageSize = 5;
    constructor(private auth: AuthService, private route: Router, private toastr: ToastrService) { }
    resolve(route: ActivatedRouteSnapshot): Observable<Anotherfile[]> {
        return this.auth.getAnotherfile(0, this.pageNumber, this.pageSize).pipe(
            catchError(error => {
                this.toastr.error('Proplem retrieving messages Another File');
                return of(null);
            })
        );
    }
}
