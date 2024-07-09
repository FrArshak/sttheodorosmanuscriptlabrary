import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UploadImgType} from "../../../types/upload-img.type";
import {DefaultResponseType} from "../../../types/default-response.type";
import {environment} from "../../../environments/environment";
import {UploadPdfType} from "../../../types/upload-pdf.type";
import {SingleCatalogType} from "../../../types/catalog.type";

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  constructor(private http: HttpClient) { }

  sendUploadedPdf(formData: FormData): Observable<UploadPdfType | DefaultResponseType> {
    return this.http.post<UploadPdfType | DefaultResponseType>(environment.api + 'upload-pdf', formData);
  }
   createCatalog(catalog_title: string, catalog_text: string, pdf_path: string, image: string): Observable<DefaultResponseType> {
      return this.http.post<DefaultResponseType>(environment.api + 'store-catalog', {catalog_title, catalog_text, pdf_path, image});
    }

   getCatalogs(): Observable<DefaultResponseType> {
      return this.http.get<DefaultResponseType>(environment.api + 'get-catalogs', )
   }

   getCatalog(id: number): Observable<SingleCatalogType | DefaultResponseType> {
    return this.http.get<SingleCatalogType | DefaultResponseType>(environment.api + 'get-catalog/' + id);
  }

  updateCatalog(id: number,catalog_title: string, catalog_text: string, pdf_path: string, image: string): Observable<DefaultResponseType> {
    return this.http.put<DefaultResponseType>(environment.api + 'update-catalog/' + id, {catalog_title, catalog_text, pdf_path, image});
  }

 deleteCatalog(id: number): Observable<DefaultResponseType> {
    return this.http.delete<DefaultResponseType>(environment.api + 'delete-catalog/' + id);
  }



}
