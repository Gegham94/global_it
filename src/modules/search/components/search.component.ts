import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { NewsApiService } from '../../../shared/services/news-api.service';
import { SearchResult } from '../../../shared/interfaces/search-result.interface';
import { SearchType } from '../../../shared/enums/search-type.enum';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  public readonly SearchType = SearchType;

  public resultList: SearchResult[] = [];

  public isLoading: boolean = false;

  private resultSubscription?: Subscription;

  public searchQuery: string = '';

  constructor(
    public readonly translate: TranslateService,
    private readonly newsApiService: NewsApiService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    @Inject(PLATFORM_ID) private platformId: any,
  ) {}

  public ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.isLoading = true;
      this.fetchResults();
      this.translate.onLangChange.subscribe(() => this.fetchResults(true));
    }
  }

  private fetchResults(isLanguageChanged: boolean = false): void {
    if (isLanguageChanged) {
      this.resultSubscription?.unsubscribe();
    }
    this.route.queryParams.subscribe((params) => {
      this.isLoading = true;
      this.searchQuery = params['query'];
      if (this.searchQuery.length > 2) {
        this.resultSubscription = this.newsApiService
          .search(params['query'])
          .subscribe((results: SearchResult[]) => {
            this.resultList = results;
            this.isLoading = false;
          });
      } else {
        this.router.navigate(['/' + this.translate.currentLang]);
      }
    });
  }
}
