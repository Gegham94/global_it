import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PartnersRoutingModule } from './partners-routing.module';
import { PartnersComponent } from './components/partners.component';
import { NewsApiService } from '../../shared/services/news-api.service';
import { LoadingModule } from '../../shared/components/loading/loading.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [PartnersComponent],
  imports: [CommonModule, PartnersRoutingModule, LoadingModule, TranslateModule],
  providers: [NewsApiService],
})
export class PartnersModule {}
