import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

const urlAPI = environment.API.EndPoint.Northwind;

@Injectable({
  providedIn: 'root'
})
export class NorthwindService {

  constructor(private http: HttpClient) { }

  getItemsDimension(dimension: string) {
    return this.http.get(`${urlAPI}GetItemByDimension/${dimension}/DESC`).pipe(
      map((result: any) => result.datosDimension)
    );
  }

  getMesDimension() {
    return this.http.get(`${urlAPI}GetMesDimension`).pipe(
      map((result: any) => result.datosMeses)
    );
  }

  getAnioDimension() {
    return this.http.get(`${urlAPI}GetAnioDimension`).pipe(
      map((result: any) => result.datosAnios)
    );
  }

  getDataPieDimension(dimension: string, values: any) {
    return this.http.post(`${urlAPI}GetDataPieDimension/${dimension}`, values).pipe(
      map((result: any) => result)
    );
  }
}
