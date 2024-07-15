import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {UploadImgType} from "../../../types/upload-img.type";
import {DefaultResponseType} from "../../../types/default-response.type";
import {BehaviorSubject, Observable} from "rxjs";
import {PostType} from "../../../types/post.type";
import {ActiveParamsType} from "../../../types/active-params.type";

@Injectable({
  providedIn: 'root'
})
export class PostService {


  private dataSubject: BehaviorSubject<boolean> = new BehaviorSubject<any>(false);
  public data$: Observable<any> = this.dataSubject.asObservable();
  constructor(private http: HttpClient) { }

  updateData(newData: any) {
    this.dataSubject.next(newData);
  }

  sendUploadedImage(formData: FormData): Observable<UploadImgType | DefaultResponseType> {
    return this.http.post<UploadImgType | DefaultResponseType>(environment.api + 'upload-image', formData);
  }

  deleteUploadedImg(img: string): Observable<DefaultResponseType> {
    return this.http.delete<DefaultResponseType>(environment.api + 'delete-image/' + img);
  }

  createNewPost(post_type: string, image: string, created_by: number, post_en?: {title: string, paragraph: string }, post_am?: {title: string, paragraph: string},): Observable<DefaultResponseType> {
    return this.http.post<DefaultResponseType>(environment.api + 'store-post', {post_type, post_en, post_am: post_en, image, created_by})
  }
  updatePost(id: number,post_type: string, image: string, created_by: number, post_en?: {title: string, paragraph: string }, post_am?: {title: string, paragraph: string},): Observable<DefaultResponseType> {
    return this.http.put<DefaultResponseType>(environment.api + 'update-post/' + id, {post_type, post_en, post_am: post_en, image, created_by})
  }
  deletePost(id: number): Observable<DefaultResponseType> {
    return this.http.put<DefaultResponseType>(environment.api + 'delete-post/' + id, {hello: 'hello'})
  }

  getPosts(params: ActiveParamsType) : Observable<PostType | DefaultResponseType>{
    return this.http.get<PostType | DefaultResponseType>(environment.api + 'get-posts', {
      params: params
    }  )
  }

  getPost(id: number): Observable<DefaultResponseType | PostType>  {
    return this.http.get<DefaultResponseType | PostType>(environment.api + 'get-post/' + id);
  }


}
