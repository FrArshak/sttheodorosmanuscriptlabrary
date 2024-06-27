import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import Typed from 'typed.js';

@Component({
  selector: 'app-banner-text-slider',
  standalone: true,
  imports: [],
  templateUrl: './banner-text-slider.component.html',
  styleUrls: ['./banner-text-slider.component.scss']
})
export class BannerTextSliderComponent implements OnInit, OnDestroy {
  @ViewChild('typedElement', { static: true }) typedElement!: ElementRef
  typed!: Typed;

  ngOnInit() {
    const options = {
      strings: ['Welcome to Manuscripts', 'Explore the World of Knowledge', 'Discover New Horizons'],
      typeSpeed: 70,
      backSpeed: 25,
      backDelay: 1500,
      startDelay: 500,
      loop: true
    };

    this.typed = new Typed(this.typedElement.nativeElement, options);
  }

  ngOnDestroy() {
    if (this.typed) {
      this.typed.destroy();
    }
  }
}
