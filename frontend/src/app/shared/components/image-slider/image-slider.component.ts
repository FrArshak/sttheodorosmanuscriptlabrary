import { Component } from '@angular/core';
import {OwlOptions} from "ngx-owl-carousel-o";
import {SliderService} from "../../services/slider.service";
@Component({
  selector: 'app-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrl: './image-slider.component.scss'
})
export class ImageSliderComponent {


  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
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
    nav: false,
    // stagePadding: this.stagePadding
  }

  constructor(private sliderService: SliderService) {
  }


}
