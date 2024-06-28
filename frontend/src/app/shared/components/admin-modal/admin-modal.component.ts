import {Component, Input, OnInit, NgZone, Injectable} from '@angular/core';
import { PostService } from "../../services/post.service";
import { HttpErrorResponse } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";
import { QuillModule } from "ngx-quill";
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import { UploadImgType } from "../../../../types/upload-img.type";
import { DefaultResponseType } from "../../../../types/default-response.type";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import { AuthService } from "../../../core/auth.service";
import { debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';
import {MatMenuModule} from "@angular/material/menu";
import {BrowserModule, DomSanitizer} from "@angular/platform-browser";

@Injectable()
@Component({
  selector: 'admin-modal',
  standalone: true,
  imports: [QuillModule, ReactiveFormsModule, FormsModule, CommonModule, BrowserModule, MatMenuModule],
  templateUrl: './admin-modal.component.html',
  styleUrls: ['./admin-modal.component.scss']
})


export class AdminModalComponent implements OnInit {

  @Input() active: boolean = false;

  img: string = '';
  imgIsAdded: boolean = false;

  postType: string = '';
  maxCharacters: number = 2500;
  currentRoute: string = '';
  currentCharacters: number = 0;

  formData: FormData | null = null;
  postTitleEn: string = '';
  postTitleArm: string = '';
  postParagraph: string = '';

  isEn: boolean = true;


  quillConfig = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      [{'header': 1}],
      [{'list': 'ordered'}, {'list': 'bullet'}],
      [{'script': 'sub'}, {'script': 'super'}],
      [{'indent': '-1'}, {'indent': '+1'}],
      [{'direction': 'rtl'}]
    ]
  };

  private contentChangedSubject = new Subject<any>();

  constructor(
    private postService: PostService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private ngZone: NgZone,
    private sanitizer: DomSanitizer


  ) {
    this.contentChangedSubject.pipe(
      debounceTime(300)
    ).subscribe(event => this.handleContentChanged(event));

    // Bind the onContentChanged method
    this.onContentChanged = this.onContentChanged.bind(this);
  }




  ngOnInit() {
    this.currentRoute = this.router.url;
    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url;
      if (this.currentRoute === '/news') {
        this.postType = 'news';
        console.log(this.postType)
      } else if (this.currentRoute === '/articles') {
        this.postType = 'articles';
      }
    });


  }

  toggleModal(img?: string, update?: boolean) {

    if(update) {
      this.postService
    }
    if (this.active && this.imgIsAdded) {
      this.postService.deleteUploadedImg(img as string)
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
    this.formData = new FormData();
    this.formData.append('image', file);

    this.postService.sendUploadedImage(this.formData)
      .subscribe({
        next: (data: UploadImgType | DefaultResponseType) => {
          this.img = (data as UploadImgType).image;
          this.imgIsAdded = true;
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
        }
      });
  }

  createPost() {
    if (this.postTitleEn || this.postTitleArm && this.postParagraph) {
      const tokens = this.authService.getTokens();
      this.postService.createNewPost(this.postType, {
        title: this.postTitleEn,
        paragraph: this.postParagraph
      }, this.img, tokens.userId)
        .subscribe({
          next: (response: DefaultResponseType) => {
            this.active = false;
          }
        });
    }
  }

  onContentChanged(event: any) {
    this.contentChangedSubject.next(event);
  }

  handleContentChanged(event: any) {
    const quill = event.editor;
    const currentLength = quill.getLength() - 1;

    // Save cursor position
    const cursorPosition = quill.getSelection(true).index;

    this.ngZone.run(() => {
      this.currentCharacters = currentLength;

      if (this.currentCharacters > this.maxCharacters) {
        // Temporarily disable the 'text-change' event listener
        quill.off('text-change', this.onContentChanged);

        quill.deleteText(this.maxCharacters, this.currentCharacters);
        this.currentCharacters = this.maxCharacters;

        // Restore cursor position
        quill.setSelection(cursorPosition, 0);

        // Re-enable the 'text-change' event listener
        quill.on('text-change', this.onContentChanged);
      }

      // Directly update the bound model
      this.postParagraph = quill.root.innerHTML;
    });
  }

  chooseLang() {
    this.isEn = !this.isEn;
  }
}

