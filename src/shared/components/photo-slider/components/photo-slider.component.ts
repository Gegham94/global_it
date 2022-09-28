import { AfterViewInit, Component, Inject, Input, PLATFORM_ID, ViewChild } from '@angular/core';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-photo-slider',
  templateUrl: './photo-slider.component.html',
  styleUrls: ['./photo-slider.component.scss'],
})
export class PhotoSliderComponent implements AfterViewInit {
  @Input()
  public originalImages: string[] = [];

  @Input()
  public thumbImages?: string[] = [];

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
      asNavFor: '.photo-slider__main',
      arrows: true,
      appendArrows: '.photo-slider__arrows',
      nextArrow: '.photo-slider__arrow.photo-slider__arrow_next',
      prevArrow: '.photo-slider__arrow.photo-slider__arrow_previous',
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

      if (this.navigationSlider) {
        // Reinitialize slick slider with new configs
        this.navigationSlider.unslick();
        this.navigationSlider.config = navigationCarouselOptions;
        this.navigationSlider.initSlick();
      }
    }
  }
}
