import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { LayoutModule } from './layout.module';
import { translateServerLoaderFactory } from '../../shared/loaders/translate-server.loader';
import { LocalStorage } from '../../shared/interfaces/local-storage.interface';
import { TransferState } from '@angular/platform-browser';
import { environment } from '../../environments/environment';
const StorageShim = require('node-storage-shim');

@NgModule({
  imports: [
    LayoutModule,
    ServerModule,
    TranslateModule.forRoot({
      defaultLanguage: environment.defaultLocale,
      loader: {
        provide: TranslateLoader,
        useFactory: translateServerLoaderFactory,
        deps: [TransferState],
      },
    }),
  ],
  providers: [{ provide: LocalStorage, useClass: StorageShim }],
})
export class LayoutServerModule {}
