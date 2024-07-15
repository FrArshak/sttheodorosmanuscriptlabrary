import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DefaultResponseType} from "../../../types/default-response.type";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }
  // name email message phone(optional)
  sendContact (name: string, email: string, message: string, phone?: string ): Observable<DefaultResponseType> {
    return this.http.post<DefaultResponseType>(environment.api + 'contact-us', {name, email, message, phone});
  }
}
