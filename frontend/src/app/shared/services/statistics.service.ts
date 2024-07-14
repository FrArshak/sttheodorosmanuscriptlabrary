import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {StatisticsDataType} from "../../../types/statistics-data.type";
import {DefaultResponseType} from "../../../types/default-response.type";

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  constructor(private http: HttpClient) { }

  countVisitor(): Observable<any> {
    return this.http.post<any>(environment.api + 'count-visitor', {});
  }

  getStatisticsData(filterType: string): Observable<StatisticsDataType | DefaultResponseType> {
    return this.http.get<StatisticsDataType | DefaultResponseType>(environment.api + 'get-statistics-data', { params: { filterType } });
  }
}
