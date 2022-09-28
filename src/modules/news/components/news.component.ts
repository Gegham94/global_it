import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { NewsApiService } from '../../../shared/services/news-api.service';
import { TranslateService } from '@ngx-translate/core';
import { News } from '../../../shared/interfaces/news.interface';
import { DynamicTitleService } from '../../../shared/services/dynamic-title.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit {
  public news: News[] = [];

  private lastNewsListLength: number = 0;

  private offset: number = 1;

  private readonly limit: number = 9;

  private laureateSubscription?: Subscription;

  public isLoading: boolean = false;

  constructor(
    private readonly newsApiService: NewsApiService,
    public readonly translate: TranslateService,
    private readonly dynamicTitleService: DynamicTitleService,
    @Inject(PLATFORM_ID) private platformId: any,
  ) {
    this.dynamicTitleService.setTitle('news.head-title');
  }

  public ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.fetchNews(false);
      this.translate.onLangChange.subscribe(() => this.fetchNews(true));
    }
  }

  private fetchNews(languageChanged: boolean = false): void {
    if (languageChanged) {
      this.laureateSubscription?.unsubscribe();
      this.isLoading = true;
    }

    const request: Observable<News[]> = languageChanged
      ? this.newsApiService.getNewsList(1, this.offset * this.limit)
      : this.newsApiService.getNewsList(this.offset, this.limit);

    this.laureateSubscription = request.subscribe((news: News[]): void => {
      if (languageChanged) {
        this.news = [];
        this.isLoading = false;
      }

      this.news.push(...news);
      this.lastNewsListLength = languageChanged ? this.limit : news.length;
    });
  }

  public getNewNews(): void {
    if (this.news.length > 0 && this.lastNewsListLength === this.limit) {
      this.offset += 1;
      this.fetchNews(false);
    }
  }
}
