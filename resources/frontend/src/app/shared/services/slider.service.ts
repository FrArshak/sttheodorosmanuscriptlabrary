import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SliderService {
  constructor(private http: HttpClient) {}

  getUser() {
    return this.http.post('http://arm-manu-jr.com/api/login', {
      email: 'admin.admin@admin.com',
      password: 'password',
    });
  }
}


