import { Component, OnInit } from '@angular/core';
import {CarouselModule, OwlOptions} from "ngx-owl-carousel-o";
import {SliderService} from "../../services/slider.service";

@Component({
  selector: 'image-slider',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './image-slider.component.html',
  styleUrl: './image-slider.component.scss'
})
export class ImageSliderComponent implements OnInit {


  customOptions: OwlOptions = {
    loop: true,
    // autoplay: true,
    // autoplaySpeed: 1000,
    // autoplayTimeout: 3000,
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

  constructor(private sliderService: SliderService) {
  }


  ngOnInit(): void {
    
  }

  changeSlide() {

  }

}
