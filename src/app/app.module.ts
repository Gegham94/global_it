import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LocalStorage } from '../shared/interfaces/local-storage.interface';

export function localStorageFactory() {
  return localStorage;
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    AppRoutingModule,
  ],
  providers: [{ provide: LocalStorage, useFactory: localStorageFactory }],
  bootstrap: [AppComponent],
})
export class AppModule {}
