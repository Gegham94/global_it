import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

import { Testemonial } from '../../../../shared/interfaces/testemonial.interface';
import { NewsApiService } from '../../../../shared/services/news-api.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-home-testemonials',
  templateUrl: './home-testemonials.component.html',
  styleUrls: ['./home-testemonials.component.scss'],
})
export class HomeTestemonialsComponent implements OnInit {
  public testemonials: Testemonial[] = [];

  private testemonialsSubscription?: Subscription;

  constructor(
    private readonly newsApiService: NewsApiService,
    private readonly translate: TranslateService,
    @Inject(PLATFORM_ID) private platformId: any,
  ) {}

  public ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.fetchTestemonials(false);
      this.translate.onLangChange.subscribe(() => this.fetchTestemonials(true));
    }
  }

  public fetchTestemonials(languageChanged: boolean = false): void {
    if (languageChanged) {
      this.testemonialsSubscription?.unsubscribe();
    }

    this.testemonialsSubscription = this.newsApiService
      .getTestemonials()
      .subscribe((testemonials: Testemonial[]) => {
        this.testemonials = testemonials;
      });
  }
}
