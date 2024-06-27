import { Component, OnInit } from '@angular/core';
import { BannerTextSliderComponent } from '../../shared/components/banner-text-slider/banner-text-slider.component';
import { SliderService } from '../../shared/services/slider.service';
import { ImageSliderComponent } from '../../shared/components/image-slider/image-slider.component';
import {AdminModalComponent} from "../../shared/components/admin-modal/admin-modal.component";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [BannerTextSliderComponent, ImageSliderComponent, AdminModalComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent implements OnInit {
  constructor(private sliderService: SliderService) {}

  ngOnInit() {}
}
