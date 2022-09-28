import { Component, HostListener, Inject, OnInit, Optional, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { TranslateService } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';

import { LocalStorage } from '../../../shared/interfaces/local-storage.interface';
import { environment } from '../../../environments/environment';
import { DynamicTitleService } from '../../../shared/services/dynamic-title.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  @HostListener('document:click', ['$event'])
  private closeCdkOverlay(event: Event): void {
    const targetClassName = (event.target as HTMLElement).className;

    if (
      targetClassName &&
      targetClassName.includes &&
      (targetClassName.includes('cdk-global-overlay-wrapper') ||
        targetClassName.includes('cdk-overlay-backdrop'))
    ) {
      document
        .querySelectorAll('.cdk-overlay-backdrop, .cdk-global-overlay-wrapper')
        .forEach((el) => {
          el.remove();
        });
    }
  }

  @HostListener('window:scroll', ['$event'])
  private makeHeaderFixed(): void {
    this.isNavigationFixed = window.scrollY >= 80;
  }

  public isNavigationFixed: boolean = false;

  private locale!: string;

  constructor(
    private readonly translate: TranslateService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly localStorage: LocalStorage,
    private readonly titleService: DynamicTitleService,
    @Optional()
    @Inject(REQUEST)
    private request: Request,
    @Inject(PLATFORM_ID) private platformId: any,
  ) {}

  public ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.translate.onLangChange.subscribe(async (newLocaleEvent) => {
        await this.router.navigateByUrl(
          this.router.url.replace(this.locale, newLocaleEvent.lang ?? this.getLang()),
          {
            replaceUrl: true,
          },
        );

        this.localStorage.setItem('locale', newLocaleEvent.lang ?? this.getLang());
        this.locale = newLocaleEvent.lang ?? this.getLang();
      });

      const oldLocale = this.locale;

      if (this.locale) {
        this.translate.use(this.locale);
        this.router.navigateByUrl(this.router.url.replace(oldLocale, this.locale), {
          replaceUrl: true,
        });
      }

      this.route.params.subscribe((params: Params) => {
        this.locale = params['lang'];
        const localeFromStorage: string = this.localStorage.getItem('locale') ?? '';

        if (
          !environment.locales.includes(localeFromStorage) &&
          !environment.locales.includes(this.locale)
        ) {
          this.router.navigateByUrl(
            this.router.url.replace(params['lang'], environment.defaultLocale),
            {
              replaceUrl: true,
            },
          );
          return;
        }

        if (this.locale) {
          this.localStorage.setItem('locale', this.locale);
        } else if (localeFromStorage) {
          this.locale = localeFromStorage;
        } else {
          this.locale = this.translate.defaultLang;
        }

        this.translate.use(this.locale);
      });
    } else {
      this.translate.use(this.getLang());
      this.titleService.updateTitle();
    }
  }

  public getLang(): string {
    let lang: string;
    if (isPlatformBrowser(this.platformId)) {
      lang = this.translate.getBrowserLang() as string;
    } else {
      // @ts-ignore
      lang = (this.request.headers['accept-language'] || 'en_US').substring(0, 2);
    }
    return lang;
  }

  public get isBowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }
}
