import {Component, Input, OnInit} from '@angular/core';
import {PostItemType, PostType} from "../../../../types/post.type";
import  moment from 'moment';
import {TruncatePipe} from "../../pipes/truncate.pipe";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {AdminModalComponent} from "../admin-modal/admin-modal.component";

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    TruncatePipe,
    AdminModalComponent
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent implements OnInit{
  @Input() post!: PostItemType;
  truncatedText!: SafeHtml;
  formattedDate: string = '';

  active: boolean = false;

  constructor(private sanitizer: DomSanitizer,
              private truncatePipe: TruncatePipe,
              ) {
  }

  ngOnInit() {
    const originalDate = this.post.created_at;
    this.formattedDate = moment(originalDate).format('DD MMMM YYYY');
    console.log(this.formattedDate); // Output: 27 June 2024

    this.truncatedText = this.sanitizer.bypassSecurityTrustHtml(
      this.truncatePipe.transform(this.post.post_en.paragraph, 200)
    );
  }



}
