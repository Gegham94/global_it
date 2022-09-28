import { AfterViewInit, Component, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { NewsApiService } from '../../../../shared/services/news-api.service';
import { News } from '../../../../shared/interfaces/news.interface';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-home-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements AfterViewInit, OnInit {
  @ViewChild('slider') slider?: SlickCarouselComponent;

  public carouselOptions!: {};

  public newsList: News[] = [];

  private newsSubscription?: Subscription;

  constructor(
    private readonly newsApiService: NewsApiService,
    public readonly translate: TranslateService,
    public readonly router: Router,
    @Inject(PLATFORM_ID) private platformId: any,
  ) {}

  public ngAfterViewInit(): void {
    this.carouselOptions = {
      slidesToShow: 1,
      sliderToScroll: 1,
      arrows: true,
      swipe: false,
      infinite: false,
      variableWidth: true,
      prevArrow: '.news__slider-arrow_back',
      nextArrow: '.news__slider-arrow_next',
      appendArrows: '.news__slider-arrows',
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 1,
            swipe: true,
          },
        },
        {
          breakpoint: 580,
          settings: {
            slidesToShow: 1,
            variableWidth: false,
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

  public ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.fetchNews(false);
      this.translate.onLangChange.subscribe(() => this.fetchNews(true));
    }
  }

  public fetchNews(languageChanged: boolean = false): void {
    if (languageChanged) {
      this.newsSubscription?.unsubscribe();
    }

    this.newsSubscription = this.newsApiService
      .getNewsList(1, 4)
      .subscribe((data: News[]): void => {
        this.newsList = data;
      });
  }
}
