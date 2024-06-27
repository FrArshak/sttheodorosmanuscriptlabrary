import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {UploadImgType} from "../../../types/upload-img.type";
import {DefaultResponseType} from "../../../types/default-response.type";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  sendUploadedImage(formData: FormData): Observable<UploadImgType | DefaultResponseType> {
    return this.http.post<UploadImgType | DefaultResponseType>(environment.api + 'upload-image', formData);
  }

  deleteUploadedImg(img: string): Observable<DefaultResponseType> {
    return this.http.delete<DefaultResponseType>(environment.api + 'delete-image/' + img);
  }

  // string('post_type');
  // $table->json('post_en');
  // $table->json('post_am');
  // $table->string('image');
  // $table->unsignedBigInteger('created_by');
  createNewPost(post_type: string,  post_en: string,  image: string, created_by: number, post_am?: string) {
    return this.http.post(environment.api + 'store-post', {post_type, post_en, image, created_by})
  }


}
