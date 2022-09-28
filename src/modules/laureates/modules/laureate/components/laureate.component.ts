import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { NewsApiService } from '../../../../../shared/services/news-api.service';
import { LaureateView } from '../../../../../shared/interfaces/laureate-view.interface';

@Component({
  selector: 'app-laureate',
  templateUrl: './laureate.component.html',
  styleUrls: ['./laureate.component.scss'],
})
export class LaureateComponent implements OnInit {
  public isLoading: boolean = false;

  public laureate?: LaureateView;

  private laureateSubscription?: Subscription;

  constructor(
    private readonly translate: TranslateService,
    private readonly newsApiService: NewsApiService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) {}

  public ngOnInit(): void {
    this.fetchLaureates(false);
    this.translate.onLangChange.subscribe(() => {
      this.fetchLaureates(true);
    });
  }

  private fetchLaureates(languageChanged: boolean = false): void {
    this.isLoading = true;
    if (languageChanged) {
      this.laureateSubscription?.unsubscribe();
    }

    this.route.params.subscribe((params) => {
      if (languageChanged && this.laureate) {
        this.router.navigateByUrl(
          '/' +
            this.translate.currentLang +
            decodeURIComponent(this.router.url)
              .replace(params['slug'], this.laureate.translation_slug)
              .slice(3),
        );
        this.laureate = undefined;
      }

      this.laureateSubscription?.unsubscribe();
      this.laureateSubscription = this.newsApiService
        .getLaureateView(
          languageChanged && this.laureate ? this.laureate.translation_slug : params['slug'],
        )
        .subscribe((laureate: LaureateView): void => {
          this.laureate = laureate;
          this.isLoading = false;
        });
    });
  }

  public get isAnySliderEmpty(): boolean {
    return (
      !this.laureate?.gallery_paths.originals ||
      this.laureate?.gallery_paths.originals.length === 0 ||
      !this.laureate?.video_paths?.length
    );
  }
}
