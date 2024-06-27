import {Component, Input, OnInit} from '@angular/core';
import {PostService} from "../../services/post.service";
import {HttpErrorResponse} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {QuillModule} from "ngx-quill";
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {UploadImgType} from "../../../../types/upload-img.type";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {CommonModule} from "@angular/common";
import {Router} from "@angular/router";
import {AuthService} from "../../../core/auth.service";

@Component({
  selector: 'admin-modal',
  standalone: true,
  imports: [QuillModule, ReactiveFormsModule, CommonModule],
  templateUrl: './admin-modal.component.html',
  styleUrls: ['./admin-modal.component.scss']
})
export class AdminModalComponent implements OnInit{

  @Input() active: boolean = false;

  img: string = '';
  imgIsAdded: boolean = false;

  postType: string = '';
  maxCharacters: number = 2500;
  currentRoute: string = '';
  currentCharacters: number = 0;
  quillConfig = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'header': 1 }, { 'header': 2 }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      [{ 'direction': 'rtl' }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'font': [] }],
      [{ 'align': [] }],
      ['clean']
    ]
  };

  constructor(
    private postService: PostService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService
  ) {}

  createPostForm = this.fb.group({
    postTitle: ['', [Validators.required]],
    postParagraph: ['', [Validators.required]],
    postImg: [null],
  });

  ngOnInit() {
    this.currentRoute = this.router.url;
    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url;
      if (this.currentRoute === '/news') {
        this.postType = 'news';
      } else if (this.currentRoute === '/articles') {
        this.postType = 'articles';
      }
    });
  }

  toggleModal(img: string) {
    if (this.active && this.imgIsAdded) {
      this.postService.deleteUploadedImg(img)
        .subscribe((data: DefaultResponseType) => {
          this._snackBar.open(data.message);
          this.imgIsAdded = false;
        });
    }
    this.active = !this.active;
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.uploadFile(file);
    }
  }

  uploadFile(file: File) {
    const formData = new FormData();
    formData.append('image', file);

    this.postService.sendUploadedImage(formData)
      .subscribe({
        next: (data: UploadImgType | DefaultResponseType) => {
          this.img = (data as UploadImgType).image;
          this.imgIsAdded = true;
          this.createPostForm.patchValue({ postImg: this.img });
        },
        error: (error: HttpErrorResponse) => {
          this._snackBar.open(error.message);
        }
      });
  }

  deleteUploadedImg(img: string) {
    this.postService.deleteUploadedImg(img)
      .subscribe({
        next: (data: DefaultResponseType) => {
          this._snackBar.open(data.message);
          this.imgIsAdded = false;
          this.createPostForm.patchValue({ postImg: '' });
        }
      });
  }

  createPost() {
    if (this.createPostForm.valid && this.createPostForm.value.postTitle && this.createPostForm.value.postParagraph && this.createPostForm.value.postImg) {
      const tokens = this.authService.getTokens();
      this.postService.createNewPost(this.postType, this.createPostForm.value.postParagraph, this.img, tokens.userId)
        .subscribe({
          next: (response) => {
            console.log(response);
          }
        });
    }
  }

  onContentChanged(event: any) {
    const quill = event.editor;
    this.currentCharacters = quill.getLength() - 1;
    if (this.currentCharacters > this.maxCharacters) {
      quill.deleteText(this.maxCharacters, this.currentCharacters);
      this.currentCharacters = this.maxCharacters;
    }
    this.createPostForm.patchValue({ postParagraph: event.html });
  }
}
