// @ts-ignore
import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
  NgZone,
  Output,
  EventEmitter, ChangeDetectorRef
} from '@angular/core';
import {PostService} from "../../services/post.service";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {QuillModule} from "ngx-quill";
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UploadImgType} from "../../../../types/upload-img.type";
import {UploadPdfType} from "../../../../types/upload-pdf.type";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {CommonModule} from "@angular/common";
import {Router} from "@angular/router";
import {AuthService} from "../../../core/auth.service";
import {debounceTime, subscribeOn} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {MatMenuModule} from "@angular/material/menu";
import {PostItemType, PostType} from "../../../../types/post.type";
import {CatalogService} from "../../services/catalog.service";
import {SingleCatalogType} from "../../../../types/catalog.type";

@Component({
  selector: 'admin-modal',
  standalone: true,
  imports: [QuillModule, FormsModule, CommonModule, MatMenuModule],
  templateUrl: './admin-modal.component.html',
  styleUrls: ['./admin-modal.component.scss']
})
export class AdminModalComponent implements OnInit, OnChanges {
  @Input() active: boolean = false;
  @Input() update: boolean = false;
  @Input() postItem: PostType | null = null;
  @Input() isPdf: boolean = false;
  @Input() support: boolean = false;
  @Input() catalog: SingleCatalogType | null = null;
  @Output() postUpdated = new EventEmitter<PostItemType>();
  @Output() postCreated = new EventEmitter<PostItemType>();

  private isLogged: boolean = false;
  private contentChangedSubject = new Subject<any>();

  activeLocal: boolean = false;
  todayDate: Date = new Date();
  img: string = '';
  pdf: string = '';
  imgIsAdded: boolean = false;
  postType: string = '';
  maxCharacters: number = 2500;
  currentRoute: string = '';
  currentCharacters: number = 0;
  formData: FormData | null = null;
  postTitleEn: string = '';
  postTitleArm: string = '';
  postParagraphEn: string = '';
  postParagraphAm: string = '';
  isEn: boolean = true;

  quillConfig = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      [{'header': 2}, {'header': 3}],
      [{'list': 'ordered'}, {'list': 'bullet'}],
      [{'script': 'sub'}, {'script': 'super'}],
      [{'indent': '-1'}, {'indent': '+1'}],
      [{'direction': 'rtl'}]
    ]
  };

  constructor(
    private postService: PostService,
    private snackBar: MatSnackBar,
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private catalogService: CatalogService,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone
  ) {
    this.contentChangedSubject.pipe(debounceTime(300)).subscribe(event => this.handleContentChanged(event));

    // this.initializeCatalogValues();
    // this.initializePostItemValues();
    // this.cdr.detectChanges();

    this.postService.data$.subscribe(data => {
      this.update = data;
    })
  }

  ngOnInit(): void {

    this.initializeComponent();

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['catalog'] && changes['catalog'].currentValue && this.update) {
      this.initializeCatalogValues();
    } else if (changes['postItem'] && changes['postItem'].currentValue && this.update && !this.catalog) {
      this.initializePostItemValues();
    } else if(this.update && this.support) {
      this.initializeComponent();
    } else if (!this.update) {
      this.resetValues();
    }
  }

  private initializeComponent(): void {
    console.log(this.update);
    this.currentRoute = this.router.url;
    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url;
      this.postType = this.getPostTypeFromRoute(this.currentRoute);
    });

    if (this.isPdf) {
      this.maxCharacters = 300;
    }

    if (this.catalog && this.update) {
      this.initializeCatalogValues();
    } else if (this.postItem && this.update && !this.catalog) {
      this.initializePostItemValues();
    } else if (this.active && this.update && this.catalog) {
      this.initializeCatalogValues();
    } else if(this.active && !this.update && this.catalog) {
      this.resetValues();
    }
  }

  private getPostTypeFromRoute(route: string): string {
    if (route.includes('news')) {
      return 'news';
    } else if (route === '/articles') {
      return 'articles';
    } else if (route === '/catalogs') {
      this.isEn = false;
      return '';
    } else if(route === '/' || '/contact' || '/about-us' || '') {
      return 'support';
    }

    return '';
  }

  private initializeCatalogValues(): void {
    this.imgIsAdded = true;
    this.pdf = this.catalog?.catalog[0].catalog_title || '';
    this.img = this.catalog?.catalog[0].image || '';
    this.postTitleArm = this.catalog?.catalog[0].catalog_title || '';
    this.postParagraphAm = this.catalog?.catalog[0].catalog_text || '';
    this.cdr.detectChanges();
  }

  private initializePostItemValues(): void {
    this.imgIsAdded = true;
    this.img = this.postItem?.post?.image || '';
    this.postTitleEn = this.postItem?.post?.post_en.title || '';
    this.postTitleArm = this.postItem?.post?.post_am.title || '';
    this.postParagraphEn = this.postItem?.post?.post_en.paragraph || '';
    this.postParagraphAm = this.postItem?.post?.post_am.paragraph || '';
    this.cdr.detectChanges();
  }

  private resetValues(): void {
    this.imgIsAdded = false;
    this.img = '';
    this.postTitleEn = '';
    this.postTitleArm = '';
    this.postParagraphEn = '';
    this.postParagraphAm = '';
    this.cdr.detectChanges();
  }

  toggleModal(img?: string | null): void {
    if (this.active && this.imgIsAdded && !this.update) {
      this.postService.deleteUploadedImg(img as string).subscribe((data: DefaultResponseType) => {
        if (data.success === 0) {
          this.snackBar.open(data.message);
          this.imgIsAdded = false;
        }
      });
    } else if (this.active && this.imgIsAdded && this.postItem) {
      this.active = !this.active;
      return;
    }
    this.active = !this.active;
  }

  onFileSelected(event: Event, pdf: boolean = false): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.uploadFile(file, pdf);
    }
  }

  uploadFile(file: File, pdf: boolean = false): void {
    this.formData = new FormData();

    if (!pdf) {
      this.formData.append('image', file);
      this.postService.sendUploadedImage(this.formData).subscribe({
        next: (data: UploadImgType | DefaultResponseType) => {
          this.img = (data as UploadImgType).image;
          this.imgIsAdded = true;
        },
        error: (error) => this.snackBar.open(error.message)
      });
    } else {
      this.formData.append('pdf', file);
      this.catalogService.sendUploadedPdf(this.formData).subscribe({
        next: (data: UploadPdfType | DefaultResponseType) => {
          if ((data as DefaultResponseType).success === 0) {
            this.snackBar.open((data as DefaultResponseType).message);
          } else {
            this.pdf = (data as UploadPdfType).path;
          }
        },
        error: (error) => this.snackBar.open(error.message)
      });
    }
  }

  deleteUploadedImg(img: string): void {
    this.postService.deleteUploadedImg(img).subscribe((data: DefaultResponseType) => {
      if (data.success === 0) {
        this.snackBar.open(data.message);
      }
      this.imgIsAdded = false;
      this.img = '';
    });
  }

  createPost(): void {
      const tokens = this.authService.getTokens();
      this.postService.createNewPost(this.postType, this.img, tokens.userId, this.getPostContent(), this.getPostContentAm())
        .subscribe({
          next: (response: DefaultResponseType) => {
            if(response.success === 0) {
              throw new Error(response.message);
            }
            this.handlePostResponse(response, 'created')
            this.active = false;
          }
        });
  }

  updatePost(): void {
      const tokens = this.authService.getTokens();
      this.postService.updatePost(this.postItem?.post?.id as number, this.postType, this.img, tokens.userId, this.getPostContent(), this.getPostContentAm())
        .subscribe((response: DefaultResponseType) => this.handlePostResponse(response, 'updated'));
  }

  createCatalog(): void {
      this.catalogService.createCatalog(this.postTitleArm, this.postParagraphAm, this.pdf, this.img)
        .subscribe({
          next: (response: DefaultResponseType) => {
            if (response.success === 0) {
              this.snackBar.open(response.message);
            } else {
              this.snackBar.open(response.message);
              this.postTitleArm = '';
              this.postParagraphAm = '';
              this.imgIsAdded = false;
              this.toggleModal();
            }
          },
          error: (error: HttpErrorResponse) => this.snackBar.open(error.message)
        });
  }

  updateCatalog(): void {
      this.catalogService.updateCatalog(this.catalog?.catalog[0].id as number, this.postTitleArm, this.postParagraphAm, this.pdf, this.img)
        .subscribe({
          next: (response: DefaultResponseType) => {
            if (response.success === 0) {
              this.snackBar.open(response.message);
            } else {
              this.snackBar.open(response.message);
              this.toggleModal();
            }
          },
          error: (error: HttpErrorResponse) => this.snackBar.open(error.message)
        });
  }

  onContentChanged(event: any): void {
    this.contentChangedSubject.next(event);
  }

  handleContentChanged(event: any): void {
    const quill = event.editor;
    const currentLength = quill.getLength() - 1; // Subtract 1 for the trailing newline character Quill adds
    const cursorPosition = quill.getSelection(true); // Get the current cursor position

    this.ngZone.run(() => {
      this.currentCharacters = currentLength;

      if (this.currentCharacters > this.maxCharacters) {
        const excessCharacters = this.currentCharacters - this.maxCharacters;
        const startIndex = cursorPosition.index - excessCharacters;

        // Disable text-change handler to avoid recursion
        quill.off('text-change', this.onContentChanged.bind(this));

        // Remove excess characters
        quill.deleteText(startIndex, excessCharacters);

        // Re-enable text-change handler
        quill.on('text-change', this.onContentChanged.bind(this));

        // Correct cursor position if needed
        if (cursorPosition.index > this.maxCharacters) {
          quill.setSelection(this.maxCharacters, 0);
        } else {
          quill.setSelection(cursorPosition.index, 0);
        }

        this.currentCharacters = this.maxCharacters;
      }

      // Save the content based on language
      if (this.isEn) {
        this.postParagraphEn = quill.root.innerHTML;
      } else {
        this.postParagraphAm = quill.root.innerHTML;
      }
    });
  }

  chooseLang(): void {
    this.isEn = !this.isEn;
  }

  private getPostContent() {
    return {title: this.postTitleEn, paragraph: this.postParagraphEn};
  }

  private getPostContentAm() {
    return {title: this.postTitleArm, paragraph: this.postParagraphAm};
  }

  private handlePostResponse(response: DefaultResponseType, action: 'created' | 'updated'): void {
    if (response.success === 0) {
      this.snackBar.open(response.message);
    } else {
      this.snackBar.open(response.message);
      const post: PostItemType = {
        id: this.postItem?.post?.id as number,
        post_type: 'news',
        post_en: {title: this.postTitleEn, paragraph: this.postParagraphEn},
        post_am: {title: this.postTitleArm, paragraph: this.postParagraphAm},
        image: this.img,
        created_at: this.todayDate.toDateString()
      };
      action === 'created' ? this.postCreated.emit(post) : this.postUpdated.emit(post);
      this.resetValues();
    }
  }
}
