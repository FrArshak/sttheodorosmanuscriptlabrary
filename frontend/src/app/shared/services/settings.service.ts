import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DefaultResponseType} from "../../../types/default-response.type";
import {environment} from "../../../environments/environment";
import {UserInfoType} from "../../../types/userInfo.type";
import {UploadImgType} from "../../../types/upload-img.type";

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(private http: HttpClient) { }



  sendUploadedLogo(formData: FormData): Observable<UploadImgType | DefaultResponseType> {
    return this.http.post<UploadImgType | DefaultResponseType>(environment.api + 'upload-logo', formData);
  }

  deleteUploadedLogo(img: string): Observable<DefaultResponseType> {
    return this.http.delete<DefaultResponseType>(environment.api + 'delete-logo/' + img);
  }
  updateSettings(logo: string, companyName: string, address: string, phone:string, email: string, fax: string, businessHours: string, metaTitle: string, metaDesc: string, addressOnMap: string): Observable<DefaultResponseType> {
    return this.http.post<DefaultResponseType>(environment.api + 'update-general-settings', {logo, companyName, address, phone, email, fax, businessHours, metaTitle, metaDesc, addressOnMap})
  }
  getUserInfo() : Observable<UserInfoType | DefaultResponseType> {
    return this.http.get<UserInfoType | DefaultResponseType>(environment.api + 'check-auth');
  }
  updateAdminsInfo(id: number ,avatar: string, name: string ,email: string, password: string, newPassword: string, newPasswordConfirm: string ): Observable<DefaultResponseType> {
    return this.http.put<DefaultResponseType>(environment.api + 'change-current-user-data/' + id, {avatar, name, email, password, newPassword, newPasswordConfirm})
  }
  createNewAdmin(name: string, email: string, password: string, passwordConfirm: string): Observable<DefaultResponseType> {
    return this.http.post<DefaultResponseType>(environment.api + 'create-user', {name, email, password, passwordConfirm});
  }




}
