import { AfterViewInit, Component, Inject, Input, PLATFORM_ID, ViewChild } from '@angular/core';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-video-slider',
  templateUrl: './video-slider.component.html',
  styleUrls: ['./video-slider.component.scss'],
})
export class VideoSliderComponent implements AfterViewInit {
  @Input()
  public videoIds: string[] = [];

  @ViewChild('slider')
  public mainSlider!: SlickCarouselComponent;

  @ViewChild('sliderNavigation')
  public navigationSlider!: SlickCarouselComponent;

  constructor(@Inject(PLATFORM_ID) private platformId: any) {}

  public ngAfterViewInit(): void {
    const mainCarouselOptions = {
      slidesToShow: 1,
      sliderToScroll: 1,
      swipe: false,
      arrows: false,
      dots: false,
      infinite: false,
      useTransform: false,
      responsive: [
        {
          breakpoint: 480,
          settings: {
            swipe: true,
            variableWidth: false,
          },
        },
      ],
    };
    const navigationCarouselOptions = {
      slidesToShow: 1,
      sliderToScroll: 1,
      centeredMode: true,
      swipe: true,
      infinite: false,
      variableWidth: true,
      asNavFor: '.video-slider__main',
      arrows: true,
      appendArrows: '.video-slider__arrows',
      nextArrow: '.video-slider__arrow.video-slider__arrow_next',
      prevArrow: '.video-slider__arrow.video-slider__arrow_previous',
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            swipe: true,
            variableWidth: false,
            slidesToShow: 2,
          },
        },
      ],
    };

    if (this.mainSlider && isPlatformBrowser(this.platformId)) {
      // Reinitialize slick slider with new configs
      this.mainSlider.unslick();
      this.mainSlider.config = mainCarouselOptions;
      this.mainSlider.initSlick();

      if (this.navigationSlider && isPlatformBrowser(this.platformId)) {
        // Reinitialize slick slider with new configs
        this.navigationSlider.unslick();
        this.navigationSlider.config = navigationCarouselOptions;
        this.navigationSlider.initSlick();
      }
    }
  }
}
