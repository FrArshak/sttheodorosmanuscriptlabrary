import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from "./layout/header/header.component";
import {CarouselModule} from "ngx-owl-carousel-o";
import {RouterModule} from "@angular/router";
import {ImageSliderComponent} from "./components/image-slider/image-slider.component";
import { BannerTextSliderComponent } from './components/banner-text-slider/banner-text-slider.component';
import { AdminHeaderComponent } from './layout/admin-header/admin-header.component';
import { MatMenuModule } from '@angular/material/menu';



@NgModule({
  declarations: [
    HeaderComponent,
    AdminHeaderComponent,
  ],
  imports: [
    CommonModule,
    MatMenuModule,
    RouterModule,
  ],
  exports: [
    HeaderComponent,
    AdminHeaderComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class SharedModule { }
