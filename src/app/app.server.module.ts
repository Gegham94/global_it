import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { LayoutServerModule } from '../modules/layout/layout.server.module';

@NgModule({
  imports: [AppModule, ServerModule, LayoutServerModule],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
