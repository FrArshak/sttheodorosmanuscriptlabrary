import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {UploadImgType} from "../../../types/upload-img.type";
import {DefaultResponseType} from "../../../types/default-response.type";
import {Observable} from "rxjs";
import {PostType} from "../../../types/post.type";
import {Params} from "@angular/router";
import {ActiveParamsType} from "../../../types/active-params.type";

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

  createNewPost(post_type: string,  post_en: {title: string, paragraph: string},  image: string, created_by: number, post_am?: string): Observable<DefaultResponseType> {
    return this.http.post<DefaultResponseType>(environment.api + 'store-post', {post_type, post_en, post_am: post_en, image, created_by})
  }

  getPosts(params: ActiveParamsType) : Observable<PostType | DefaultResponseType>{
    return this.http.get<PostType | DefaultResponseType>(environment.api + 'get-posts', {
      params: params
    }  )
  }

  getPost(id: string)  {

  }


}
