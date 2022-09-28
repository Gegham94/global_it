import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

import { NewsApiService } from '../../../shared/services/news-api.service';
import { Partners } from '../../../shared/interfaces/partners.interface';
import { DynamicTitleService } from '../../../shared/services/dynamic-title.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.scss'],
})
export class PartnersComponent implements OnInit {
  public partners: Partners[] = [];

  private partnersSubscription?: Subscription;

  constructor(
    private readonly newsApiService: NewsApiService,
    private readonly translate: TranslateService,
    private readonly dynamicTitleService: DynamicTitleService,
    @Inject(PLATFORM_ID) private platformId: any,
  ) {
    this.dynamicTitleService.setTitle('partners.head-title');
  }

  public ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.fetchPartners();
      this.translate.onLangChange.subscribe(() => this.fetchPartners(true));
    }
  }

  private fetchPartners(languageChanged: boolean = false): void {
    if (languageChanged) {
      this.partnersSubscription?.unsubscribe();
      this.partners = [];
    }

    this.partnersSubscription = this.newsApiService
      .getPartners()
      .subscribe((partners: Partners[]): void => {
        this.partners = partners;
      });
  }
}
