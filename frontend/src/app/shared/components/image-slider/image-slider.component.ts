import {Component, Input, OnInit} from '@angular/core';
import {CarouselModule, OwlOptions} from "ngx-owl-carousel-o";
import {SliderService} from "../../services/slider.service";
import {PostService} from "../../services/post.service";
import {ActiveParamsType} from "../../../../types/active-params.type";
import {PostItemType, PostType} from "../../../../types/post.type";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpErrorResponse} from "@angular/common/http";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'image-slider',
  standalone: true,
  imports: [CarouselModule, CommonModule],
  templateUrl: './image-slider.component.html',
  styleUrl: './image-slider.component.scss'
})
export class ImageSliderComponent implements OnInit {

  @Input() theme: string = '';
  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    autoplaySpeed: 1000,
    autoplayTimeout: 3000,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: false
  }

  activeParams: ActiveParamsType = { postType: '', skip: 0, take: 4,}

  slides: PostItemType[] = [];

  constructor(private postService: PostService, private _snackBar: MatSnackBar) {
  }


  ngOnInit(): void {

    if(this.theme) {
      this.activeParams.postType = this.theme;

      this.postService.getPosts(this.activeParams)
        .subscribe({
            next: (response: PostType | DefaultResponseType) => {
              if((response as DefaultResponseType).success === 0) {
                this._snackBar.open((response as DefaultResponseType).message)
                throw new Error((response as DefaultResponseType).message);
              }
              this.slides = (response as PostType).posts as PostItemType[];
            },
            error: (error: HttpErrorResponse) => {
              throw new Error(error.message);
            }
          })
    }



  }

  changeSlide() {

  }

}
