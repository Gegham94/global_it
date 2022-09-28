import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnInit,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

import { NewsApiService } from '../../../../shared/services/news-api.service';
import { Laureate } from '../../../../shared/interfaces/laureate.interface';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-laureate-slider',
  templateUrl: './laureate-slider.component.html',
  styleUrls: ['./laureate-slider.component.scss'],
})
export class LaureatesSliderComponent implements AfterViewInit, OnInit {
  @ViewChild('sliderArrows') sliderArrowContainer?: ElementRef;

  @ViewChild('backArrow') sliderBackArrow?: ElementRef;

  @ViewChild('slider') slider?: SlickCarouselComponent;

  @ViewChild('nextArrow') sliderNextArrow?: ElementRef;

  public carouselOptions!: {};

  public laureates: Laureate[] = [];

  private laureatesSubscription?: Subscription;

  constructor(
    private readonly newsApiService: NewsApiService,
    private readonly translate: TranslateService,
    @Inject(PLATFORM_ID) private platformId: any,
  ) {}

  public ngAfterViewInit(): void {
    this.carouselOptions = {
      slidesToShow: 3,
      sliderToScroll: 1,
      swipe: false,
      arrows: true,
      infinite: false,
      variableWidth: true,
      centerMode: false,
      prevArrow: '.laureates__slider-arrow_back',
      nextArrow: '.laureates__slider-arrow_next',
      appendArrows: '.laureates__slider-arrows',
      responsive: [
        {
          breakpoint: 1440,
          settings: {
            variableWidth: false,
          },
        },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            variableWidth: false,
            swipe: true,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            variableWidth: false,
            centeredMode: true,
            swipe: true,
          },
        },
      ],
    };

    if (this.slider && isPlatformBrowser(this.platformId)) {
      // Reinitialize slick slider with new configs
      this.slider.unslick();
      this.slider.config = this.carouselOptions;
      this.slider.initSlick();
    }
  }

  public ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.fetchLaureates(false);
      this.translate.onLangChange.subscribe(() => this.fetchLaureates(true));
    }
  }

  public fetchLaureates(languageChanged: boolean = false): void {
    if (languageChanged) {
      this.laureatesSubscription?.unsubscribe();
    }

    this.laureatesSubscription = this.newsApiService
      .getlaureates(1, 10)
      .subscribe((laureates: Laureate[]) => {
        this.laureates = laureates;
      });
  }
}
