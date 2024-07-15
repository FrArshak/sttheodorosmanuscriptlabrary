import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {PostItemType, PostType} from "../../../../types/post.type";
import  moment from 'moment';
import {TruncatePipe} from "../../pipes/truncate.pipe";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {AdminModalComponent} from "../admin-modal/admin-modal.component";
import {CommonModule} from "@angular/common";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {HttpErrorResponse} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {PostService} from "../../services/post.service";
import {AuthService} from "../../../core/auth.service";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-card',
  standalone: true,
    imports: [
        TruncatePipe,
        AdminModalComponent,
        CommonModule,
        RouterLink
    ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent implements OnInit{
  @Input() post!: PostItemType;
  @Output() postItem: EventEmitter<PostType> = new EventEmitter<PostType>();
  @Output() activeCalled: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() activeLocalEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() idEmitter: EventEmitter<number> = new EventEmitter<number>();
  isLogged: boolean = false;
  postCard!: PostType;

  activeLocal: boolean = true;
  truncatedText!: SafeHtml;
  formattedDate: string = '';

  active: boolean = false;

  constructor(private sanitizer: DomSanitizer,
              private truncatePipe: TruncatePipe,
              private _snackBar: MatSnackBar,
              private postService: PostService,
              private authService: AuthService
              ) {
    this.isLogged = this.authService.getIsLoggedIn();
  }

  ngOnInit() {
    const originalDate = this.post.created_at;
    this.formattedDate = moment(originalDate).format('DD MMMM YYYY');

    this.truncatedText = this.sanitizer.bypassSecurityTrustHtml(
      this.truncatePipe.transform(this.post.post_en.paragraph, 200)
    );
  }

  editCard(id: number) {
    this.activeCalled.emit(this.active);
    try {
      this.postService.getPost(id)
        .subscribe({
          next: (newsArticle: DefaultResponseType | PostType) => {
            this.postCard = (newsArticle as PostType);
            this.postItem.emit(this.postCard);
          },
          error: (error: HttpErrorResponse) => {
            this._snackBar.open(error.message);
          }
        });
    } catch(error) {
      console.log(error)
    }
  }

  deleteCard(id: number) {
    this.activeLocalEmitter.emit(this.activeLocal);
    this.idEmitter.emit(id)
  }
}
// this.active = true; // Set activeLocal to true when updating
// this.postTitleEn = (response as PostItemType).post_en.title;
// this.postParagraph = (response as PostItemType).post_en.paragraph
// this.img = (response as PostItemType).image;
// this.postTitleArm = (response as PostItemType).post_am.title
