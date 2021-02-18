import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AutoNumber } from '../_models/autoNumber';
import {
  PaginatedResultAutoNumber,
  PaginatedResultCustomers,
  PaginatedResultResom,
  PaginatedResultSearchByCivilId,
  PaginatedResultStatemnentSec
} from '../_models/pagination';
import { Resom } from '../_models/resom';
import { SearchByCivilId } from '../_models/SearchByCivilId';
import { StatementSec } from '../_models/statementSec';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CallCenterService {
  constructor(private http: HttpClient) { }
  baseUrl = environment.apiUrl;
  pdfSrc: any;

  updateNumber(id: number, isvoke: any): any {
    return this.http.put(this.baseUrl + 'user/updatenumber/' + id, { IS_VOKE: isvoke });
  }
  getNumberToSaveOrUpdate(id): any {
    return this.http.get(this.baseUrl + 'user/numberForSaveOrUpdate/' + id);
  }
  saveNewNumber(newNumber: any): any {
    return this.http.post(this.baseUrl + 'user/addNewNumber', newNumber);
  }
  updateNumbers(id: number, numberUpdate: any): any {
    return this.http.put(this.baseUrl + 'user/updateNumbers/' + id, numberUpdate);
  }
  getNextProcess(): any {
    return this.http.get(this.baseUrl + 'user/nextprocess');
  }
  searchByName(name?, filter?, page?, itemsPerPage?): Observable<PaginatedResultSearchByCivilId<SearchByCivilId[]>> {
    const paginatedResult: PaginatedResultSearchByCivilId<SearchByCivilId[]> = new PaginatedResultSearchByCivilId<SearchByCivilId[]>();
    let params = new HttpParams();
    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }
    return this.http.get<SearchByCivilId[]>(this.baseUrl + 'user/' + filter + '/' + name,
      { observe: 'response', params }).pipe(map(response => {
        paginatedResult.result = response.body;
        if (response.headers.get('pagination') != null) {
          paginatedResult.pagination = JSON.parse(response.headers.get('pagination'));
        }
        return paginatedResult;
      }, error => {
        console.log(error);
      }));
  }
  getStatmentSec(code?, page?, itemsPerPage?): Observable<PaginatedResultStatemnentSec<StatementSec[]>> {
    const paginatedResult: PaginatedResultStatemnentSec<StatementSec[]> = new PaginatedResultStatemnentSec<StatementSec[]>();
    let params = new HttpParams();
    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }
    return this.http.get<StatementSec[]>(this.baseUrl + 'user/statementSec/' + code,
      { observe: 'response', params }).pipe(map(response => {
        paginatedResult.result = response.body;
        if (response.headers.get('pagination') != null) {
          paginatedResult.pagination = JSON.parse(response.headers.get('pagination'));
        }
        return paginatedResult;
      }, error => {
        console.log(error);
      }));
  }
  customers(emp?): any {
    return this.http.get(this.baseUrl + 'user/customers/' + emp);
  }
  getCaseCustomer(filter: string): any {
    return this.http.get(this.baseUrl + 'user/caseemp/' + filter);
  }
  getAutoNumber(code?, page?, itemsPerPage?): Observable<PaginatedResultAutoNumber<AutoNumber[]>> {
    const paginatedResult: PaginatedResultAutoNumber<AutoNumber[]> = new PaginatedResultAutoNumber<AutoNumber[]>();
    let params = new HttpParams();
    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }
    return this.http.get<AutoNumber[]>(this.baseUrl + 'user/autoNum/' + code, { observe: 'response', params, }).pipe(map((response) => {
      paginatedResult.result = response.body;
      if (response.headers.get('pagination') != null) {
        paginatedResult.pagination = JSON.parse(
          response.headers.get('pagination')
        );
      }
      return paginatedResult;
    }, (error) => {
      console.log(error);
    })
    );
  }
  getSubAutoNumber(autoNumner): any {
    return this.http.get(this.baseUrl + 'user/subautonum/' + autoNumner);
  }
  getResom(code?, page?, itemsPerPage?): Observable<PaginatedResultResom<Resom[]>> {
    const paginatedResult: PaginatedResultResom<Resom[]> = new PaginatedResultResom<Resom[]>();
    let params = new HttpParams();
    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }
    return this.http.get<Resom[]>(this.baseUrl + 'user/resom/' + code, { observe: 'response', params, }).pipe(map((response) => {
      paginatedResult.result = response.body;
      if (response.headers.get('pagination') != null) {
        paginatedResult.pagination = JSON.parse(
          response.headers.get('pagination')
        );
      }
      return paginatedResult;
    }, (error) => {
      console.log(error);
    })
    );
  }
  getUploadProces(code): any {
    return this.http.get(this.baseUrl + 'user/uploadProcess/' + code);
  }
  getPDF(id: any): any {
    return this.http.get(this.baseUrl + 'user/resompdf/' + id);
  }
  updateClassifications(Code: number, classifications: any): any {
    return this.http.put(this.baseUrl + 'user/updatecasecivilid/' + Code, classifications);
  }
  updateEmp(code: number, emp: number): any {
    return this.http.put(this.baseUrl + 'user/updateEmp/' + code, { EMPLOYE: 555, ENTRY_EMPLOY: emp });
  }
  updateTowsolNumber(code: number, num: number, emp: number): any {
    return this.http.put(this.baseUrl + 'user/updateTowsolNumber/' + code, { TWASEL_NUM: num, EMP_TWASEL_NUM: emp });
  }
  updateInstallement(code: number, amount: number, date: Date): any {
    return this.http.put(this.baseUrl + 'user/updateInstallement/' + code, { PRT_AMONT: amount, DATE_PRT_AMONT: date });
  }
  updatePromise(code: number): any {
    return this.http.put(this.baseUrl + 'user/updatePromise/' + code, {});
  }
}
