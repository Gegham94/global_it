import { AfterViewInit, Component, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { NewsApiService } from '../../../../shared/services/news-api.service';
import { SliderElement } from '../../../../shared/interfaces/slider-element.interface';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-home-primary-slider',
  templateUrl: './primary-slider.component.html',
  styleUrls: ['./primary-slider.component.scss'],
})
export class PrimarySliderComponent implements AfterViewInit, OnInit {
  @ViewChild('slider') slider?: SlickCarouselComponent;

  public carouselData: SliderElement[] = [];

  public carouselOptions!: {};

  constructor(
    private readonly newsApiService: NewsApiService,
    @Inject(PLATFORM_ID) private platformId: any,
  ) {}

  public ngAfterViewInit(): void {
    this.carouselOptions = {
      slidesToShow: 1,
      sliderToScroll: 1,
      dots: true,
      arrows: true,
      infinite: true,
      variableWidth: false,
      autoplay: true,
      autoplaySpeed: 5000,
      prevArrow: '.home-primary__slider-arrow_back',
      nextArrow: '.home-primary__slider-arrow_next',
      appendDots: '.home-primary__slider-dots',
    };

    if (this.slider && isPlatformBrowser(this.platformId)) {
      // Reinitialize slick slider with new configs
      this.slider.unslick();
      this.slider.config = this.carouselOptions;
      this.slider.initSlick();
    }
  }

  public ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.newsApiService.getSliderData().subscribe((data) => {
        this.carouselData = data;
      });
    }
  }
}
