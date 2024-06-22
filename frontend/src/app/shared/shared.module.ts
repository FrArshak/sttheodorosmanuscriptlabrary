import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from "./layout/header/header.component";
import {CarouselModule} from "ngx-owl-carousel-o";
import {RouterModule} from "@angular/router";
import {ImageSliderComponent} from "./components/image-slider/image-slider.component";



@NgModule({
  declarations: [
    HeaderComponent,
    ImageSliderComponent
  ],
  imports: [
    CommonModule,
    CarouselModule,
    RouterModule,
  ],
  exports: [
    HeaderComponent
  ]
})
export class SharedModule { }
