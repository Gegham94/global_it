import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NewsApiService } from '../../../shared/services/news-api.service';
import { Laureate } from '../../../shared/interfaces/laureate.interface';
import { Observable, Subscription } from 'rxjs';
import { DynamicTitleService } from '../../../shared/services/dynamic-title.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-laureates',
  templateUrl: './laureates.component.html',
  styleUrls: ['./laureates.component.scss'],
})
export class LaureatesComponent implements OnInit {
  public laureates: Laureate[] = [];

  public lastLaureatesListLength: number = 0;

  private offset: number = 1;

  private readonly limit: number = 9;

  private laureateSubscription?: Subscription;

  public isLoading: boolean = false;

  constructor(
    private readonly newsApiService: NewsApiService,
    private readonly translate: TranslateService,
    private readonly dynamicTitleService: DynamicTitleService,
    @Inject(PLATFORM_ID) private platformId: any,
  ) {
    this.dynamicTitleService.setTitle('laureates.head-title');
  }

  public ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.fetchLaureates(false);
      this.translate.onLangChange.subscribe(() => this.fetchLaureates(true));
    }
  }

  private fetchLaureates(languageChanged: boolean = false): void {
    if (languageChanged) {
      this.laureateSubscription?.unsubscribe();
      this.isLoading = true;
    }

    const request: Observable<Laureate[]> = languageChanged
      ? this.newsApiService.getlaureates(1, this.offset * this.limit)
      : this.newsApiService.getlaureates(this.offset, this.limit);

    this.laureateSubscription = request.subscribe((laureates: Laureate[]): void => {
      if (languageChanged) {
        this.laureates = [];
        this.isLoading = false;
      }

      this.laureates.push(...laureates);
      this.lastLaureatesListLength = languageChanged ? this.limit : laureates.length;
    });
  }

  public getNewLaureates(): void {
    if (this.lastLaureatesListLength === this.limit) {
      this.offset += 1;
      this.fetchLaureates(false);
    }
  }
}
