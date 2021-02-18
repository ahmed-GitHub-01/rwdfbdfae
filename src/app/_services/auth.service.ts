import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pay } from '../_models/Pay';
import { Statment } from '../_models/Statment';
import {
  PaginatedResultAnotherFile, PaginatedResultNumber, PaginatedResultOldStatment,
  PaginatedResultPay, PaginatedResultSearchByCivilId, PaginatedResultStatment, PaginationSearchByCivilId
} from '../_models/pagination';
import { NumberPhone } from '../_models/NumberPhone';
import { OldStatment } from '../_models/OldStatment';
import { Anotherfile } from '../_models/anotherfile';
import { SearchByCivilId } from '../_models/SearchByCivilId';
import { Main } from '../_models/Main';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.apiUrl;
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  constructor(private http: HttpClient) { }
  login(model: any): any {
    return this.http.post(this.baseUrl + 'Auth/login', model).pipe(map((response: any) => {
      const user = response;
      if (user) {
        localStorage.setItem('token', user.token);
        this.decodedToken = this.jwtHelper.decodeToken(user.token);
      }
    }));
  }
  loggedIn(): any {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }
  register(model: any): any {
    return this.http.post(this.baseUrl + 'register', model);
  }
  getMain(code): Observable<Main[]> {
    return this.http.get<Main[]>(this.baseUrl + 'user/customer/' + code);
  }
  getPay(code, page?, itemsPerPage?): Observable<PaginatedResultPay<Pay[]>> {
    const paginatedResult: PaginatedResultPay<Pay[]> = new PaginatedResultPay<Pay[]>();
    let params = new HttpParams();
    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }
    return this.http.get<Pay[]>(this.baseUrl + 'user/pay/' + code, { observe: 'response', params }).pipe(
      map(response => {
        paginatedResult.result = response.body;
        if (response.headers.get('pagination') != null) {
          paginatedResult.pagination = JSON.parse(response.headers.get('pagination'));
        }
        return paginatedResult;
      }, error => {
        console.log(error);
      })
    );
  }
  getTotalPay(code): any {
    return this.http.get(this.baseUrl + 'user/totalpay/' + code);
  }
  getStatment(code?, page?, itemsPerPage?): Observable<PaginatedResultStatment<Statment[]>> {
    const paginatedResul: PaginatedResultStatment<Statment[]> = new PaginatedResultStatment<Statment[]>();
    let params = new HttpParams();
    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }
    return this.http.get<Statment[]>(this.baseUrl + 'user/statment/' + code, { observe: 'response', params }).pipe(
      map(response => {
        paginatedResul.result = response.body;
        if (response.headers.get('pagination') != null) {
          paginatedResul.pagination = JSON.parse(response.headers.get('pagination'));
        }
        return paginatedResul;
      }, error => {
        console.log(error);
      })
    );
  }
  getNumber(civilId?, page?, itemsPerPage?): Observable<PaginatedResultNumber<NumberPhone[]>> {
    const paginatedResult: PaginatedResultNumber<NumberPhone[]> = new PaginatedResultNumber<NumberPhone[]>();
    let params = new HttpParams();
    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }
    return this.http.get<NumberPhone[]>(this.baseUrl + 'user/numbers/' + civilId, { observe: 'response', params }).pipe(
      map(response => {
        paginatedResult.result = response.body;
        if (response.headers.get('pagination') != null) {
          paginatedResult.pagination = JSON.parse(response.headers.get('pagination'));
        }
        return paginatedResult;
      }, error => {
        console.log(error);
      })
    );
  }
  saveStatment(emp: number, statment: Statment): any {
    return this.http.post(this.baseUrl + 'user/addstatment/' + emp, statment);
  }
  getOldStatment(Code?, page?, itemsPerPage?): Observable<PaginatedResultOldStatment<OldStatment[]>> {
    const paginatedResult: PaginatedResultOldStatment<OldStatment[]> = new PaginatedResultOldStatment<OldStatment[]>();
    let params = new HttpParams();
    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }
    return this.http.get<OldStatment[]>(this.baseUrl + 'user/oldstatment/' + Code, { observe: 'response', params }).pipe(map(response => {
      paginatedResult.result = response.body;
      if (response.headers.get('pagination') != null) {
        paginatedResult.pagination = JSON.parse(response.headers.get('pagination'));
      }
      return paginatedResult;
    }, error => {
      console.log(error);
    }));
  }
  getAnotherfile(civilID?, page?, itemsPerPage?): Observable<PaginatedResultAnotherFile<Anotherfile[]>> {
    const paginatedResult: PaginatedResultAnotherFile<Anotherfile[]> = new PaginatedResultAnotherFile<Anotherfile[]>();
    let params = new HttpParams();
    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }
    return this.http.get<Anotherfile[]>(this.baseUrl + 'user/anotherfile/' + civilID,
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
  searchByCivilId(civilID?, page?, itemsPerPage?): Observable<PaginatedResultSearchByCivilId<SearchByCivilId[]>> {
    const paginatedResult: PaginatedResultSearchByCivilId<SearchByCivilId[]> = new PaginatedResultSearchByCivilId<SearchByCivilId[]>();
    let params = new HttpParams();
    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }
    return this.http.get<SearchByCivilId[]>(this.baseUrl + 'user/searchByCivilId/' + civilID,
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
  updateUser(user: any, code: number): any {
    return this.http.put(this.baseUrl + 'auth/updateuser/' + code, user);
  }
}
