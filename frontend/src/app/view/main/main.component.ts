import { Component, OnInit } from '@angular/core';
import { BannerTextSliderComponent } from '../../shared/components/banner-text-slider/banner-text-slider.component';
import { SliderService } from '../../shared/services/slider.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [BannerTextSliderComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent implements OnInit {
  constructor(private sliderService: SliderService) {}

  ngOnInit() {}
}
