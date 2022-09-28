import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { NewsApiService } from '../../../../../shared/services/news-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NewsView } from '../../../../../shared/interfaces/news-view.interface';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-news-view',
  templateUrl: './news-view.component.html',
  styleUrls: ['./news-view.component.scss'],
})
export class NewsViewComponent implements OnInit {
  public isLoading: boolean = false;

  public news?: NewsView;

  private newsSubscription?: Subscription;

  constructor(
    public readonly translate: TranslateService,
    private readonly newsApiService: NewsApiService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    @Inject(PLATFORM_ID) private platformId: any,
  ) {}

  public ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.fetchNews(false);
      this.translate.onLangChange.subscribe(() => {
        this.fetchNews(true);
      });
    }
  }

  private fetchNews(languageChanged: boolean = false): void {
    this.isLoading = true;
    if (languageChanged) {
      this.newsSubscription?.unsubscribe();
    }

    this.route.params.subscribe((params) => {
      if (languageChanged && this.news) {
        this.router.navigateByUrl(
          this.news.translation_slug
            ? '/' +
                this.translate.currentLang +
                decodeURIComponent(this.router.url)
                  .replace(params['slug'], this.news.translation_slug)
                  .slice(3)
            : '/' + this.translate.currentLang + '/news',
        );
      }

      this.newsSubscription?.unsubscribe();
      this.newsSubscription = this.newsApiService
        .getNews(params['slug'])
        .subscribe((news: NewsView): void => {
          this.news = news;
          this.isLoading = false;
        });
    });
  }
}
