import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { News } from '../interfaces/news.interface';
import { Testemonial } from '../interfaces/testemonial.interface';
import { Laureate } from '../interfaces/laureate.interface';
import { LaureateView } from '../interfaces/laureate-view.interface';
import { NewsView } from '../interfaces/news-view.interface';
import { Committee } from '../interfaces/committee.interface';
import { Partners } from '../interfaces/partners.interface';
import { SearchResult } from '../interfaces/search-result.interface';
import { SliderElement } from '../interfaces/slider-element.interface';

@Injectable()
export class NewsApiService {
  private readonly baseUrl: string = environment.baseApiUrl + '/news';

  constructor(
    private readonly httpClient: HttpClient,
    private readonly translateService: TranslateService,
  ) {}

  public getNewsList(offset: number, limit: number): Observable<News[]> {
    return this.httpClient.get<News[]>(this.baseUrl + '/list', {
      params: {
        language: environment.locales.indexOf(this.translateService.currentLang) + 1,
        limit,
        offset,
      },
    });
  }

  public getNews(slug: string): Observable<NewsView> {
    return this.httpClient.get<NewsView>(this.baseUrl + '/view', {
      params: {
        slug,
      },
    });
  }

  public getTestemonials(): Observable<Testemonial[]> {
    return this.httpClient.get<Testemonial[]>(this.baseUrl + '/testemonials', {
      params: {
        language: environment.locales.indexOf(this.translateService.currentLang) + 1,
      },
    });
  }

  public getlaureates(offset: number, limit: number): Observable<Laureate[]> {
    return this.httpClient.get<Laureate[]>(this.baseUrl + '/laureates', {
      params: {
        language: environment.locales.indexOf(this.translateService.currentLang) + 1,
        limit,
        offset,
      },
    });
  }

  public getLaureateView(slug: string): Observable<LaureateView> {
    return this.httpClient.get<LaureateView>(this.baseUrl + '/laureate-view', {
      params: {
        slug,
      },
    });
  }

  public getCommittee(): Observable<Committee[]> {
    return this.httpClient.get<Committee[]>(this.baseUrl + '/committee', {
      params: {
        language: environment.locales.indexOf(this.translateService.currentLang) + 1,
      },
    });
  }

  public getPartners(): Observable<Partners[]> {
    return this.httpClient.get<Partners[]>(this.baseUrl + '/partners', {
      params: {
        language: environment.locales.indexOf(this.translateService.currentLang) + 1,
      },
    });
  }

  public search(keyword: string): Observable<SearchResult[]> {
    return this.httpClient.get<SearchResult[]>(this.baseUrl + '/search', {
      params: {
        keyword,
        language: environment.locales.indexOf(this.translateService.currentLang) + 1,
      },
    });
  }

  public getSliderData(): Observable<SliderElement[]> {
    return this.httpClient.get<SliderElement[]>(this.baseUrl + '/slider', {
      params: {
        language: environment.locales.indexOf(this.translateService.currentLang) + 1,
      },
    });
  }
}
