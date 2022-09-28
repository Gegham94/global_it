import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Injectable()
export class DynamicTitleService {
  private languageSubscription?: Subscription;

  constructor(private readonly title: Title, private readonly translate: TranslateService) {}

  public setTitle(title: string): void {
    this.languageSubscription?.unsubscribe();

    this.translateAndSetTitleInHead(title);

    this.languageSubscription = this.translate.onLangChange.subscribe(() => {
      this.translateAndSetTitleInHead(title);
    });
  }

  public updateTitle() {
    const title = this.title.getTitle();
    this.translateAndSetTitleInHead(title);
  }

  private translateAndSetTitleInHead(titleToTranslate: string): void {
    this.translate.get(titleToTranslate).subscribe((translatedTitle) => {
      this.title.setTitle(translatedTitle.split(' | ')[0] + ' | Global IT Award');
    });
  }
}
