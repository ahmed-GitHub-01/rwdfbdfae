import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SearchByCivilId } from '../_models/SearchByCivilId';
import { AuthService } from '../_services/auth.service';

@Injectable()
export class SearchByCivilIdResolver implements Resolve<SearchByCivilId[]>{
    pageNumber = 1;
    pageSize = 5;
    constructor(private auth: AuthService, private route: Router, private toastr: ToastrService) { }
    resolve(route: ActivatedRouteSnapshot): Observable<SearchByCivilId[]> {
        return this.auth.searchByCivilId(0, this.pageNumber, this.pageSize).pipe(
            catchError(error => {
                this.toastr.error('Proplem retrieving messages search by civilId');
                return of(null);
            })
        );
    }
}
