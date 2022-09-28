import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './components/layout.component';
import { HeaderModule } from '../../shared/components/header/header.module';
import { NavigationModule } from '../../shared/components/navigation/navigation.module';
import { FooterModule } from '../../shared/components/footer/footer.module';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ResponseErrorInterceptor } from '../../shared/interceptors/response-error.interceptor';
import localeHy from '@angular/common/locales/hy';
import localeEn from '@angular/common/locales/en';
import { ToastrModule } from 'ngx-toastr';
import { DynamicTitleService } from '../../shared/services/dynamic-title.service';
import { ScrollUpButtonModule } from '../../shared/components/scroll-up-button/scroll-up-button.module';
import { translateBrowserLoaderFactory } from '../../shared/loaders/translate-browser.loader';
import { TransferState } from '@angular/platform-browser';

registerLocaleData(localeEn);
registerLocaleData(localeHy);

@NgModule({
  declarations: [LayoutComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    TranslateModule.forRoot({
      defaultLanguage: environment.defaultLocale,
      loader: {
        provide: TranslateLoader,
        useFactory: translateBrowserLoaderFactory,
        deps: [HttpClient, TransferState],
      },
    }),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
    }),
    LayoutRoutingModule,
    HeaderModule,
    NavigationModule,
    FooterModule,
    ScrollUpButtonModule,
  ],
  providers: [
    DynamicTitleService,
    { provide: HTTP_INTERCEPTORS, useClass: ResponseErrorInterceptor, multi: true },
    {
      provide: LOCALE_ID,
      deps: [TranslateService],
      useFactory: (translateService: TranslateService) => translateService.currentLang,
    },
  ],
})
export class LayoutModule {}
