import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DefaultResponseType} from "../../../types/default-response.type";
import {environment} from "../../../environments/environment";
import {UserInfoType} from "../../../types/userInfo.type";
import {UploadImgType} from "../../../types/upload-img.type";
import {GeneralSettingsType} from "../../../types/general-settings.type";
import {UploadLogoType} from "../../../types/upload-logo.type";

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(private http: HttpClient) { }



  sendUploadedLogo(formData: FormData): Observable<UploadLogoType | DefaultResponseType> {
    return this.http.post<UploadLogoType | DefaultResponseType>(environment.api + 'upload-logo', formData);
  }

  deleteUploadedLogo(img: string): Observable<DefaultResponseType> {
    return this.http.delete<DefaultResponseType>(environment.api + 'delete-logo/' + img);
  }
  updateSettings(logo: string, companyName: string, address: string, phone:string, email: string, fax: string, businessHours: string, metaTitle: string, metaDesc: string, addressOnMap: string, donationLink: string): Observable<DefaultResponseType> {
    return this.http.post<DefaultResponseType>(environment.api + 'update-general-settings', [
      {setting_key: 'logo', setting_value: logo},
      {setting_key: 'companyName', setting_value: companyName},
      {setting_key: 'address', setting_value: address},
      {setting_key: 'phone', setting_value: phone},
      {setting_key: 'email', setting_value: email},
      {setting_key: 'fax', setting_value: fax},
      {setting_key: 'businessHours', setting_value: businessHours},
      {setting_key: 'metaTitle', setting_value: metaTitle},
      {setting_key: 'metaDesc', setting_value: metaDesc},
      {setting_key: 'addressOnMap', setting_value: addressOnMap},
      {setting_key: 'donationLink', setting_value: donationLink},
        ])
  }

  getSettings(): Observable<DefaultResponseType | GeneralSettingsType> {
    return this.http.get<DefaultResponseType | GeneralSettingsType>(environment.api + 'get-general-settings');
  }
  getUserInfo() : Observable<UserInfoType | DefaultResponseType> {
    return this.http.get<UserInfoType | DefaultResponseType>(environment.api + 'check-auth');
  }
  updateAdminsInfo(updateParams: any, id: string): Observable<DefaultResponseType> {
    return this.http.put<DefaultResponseType>(environment.api + 'change-current-user-data/' + id, updateParams);
  }
  createNewAdmin(name: string, email: string, password: string, passwordConfirm: string): Observable<DefaultResponseType> {
    return this.http.post<DefaultResponseType>(environment.api + 'create-user', {name, email, password, passwordConfirm});
  }




}
