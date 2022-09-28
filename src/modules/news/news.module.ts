import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { NewsRoutingModule } from './news-routing.module';
import { NewsComponent } from './components/news.component';
import { LoadingModule } from '../../shared/components/loading/loading.module';
import { PrimaryBlockModule } from '../../shared/components/primary-block/primary-block.module';
import { NewsApiService } from '../../shared/services/news-api.service';

@NgModule({
  declarations: [NewsComponent],
  imports: [
    CommonModule,
    NewsRoutingModule,
    InfiniteScrollModule,
    TranslateModule,
    LoadingModule,
    PrimaryBlockModule,
  ],
  providers: [NewsApiService],
})
export class NewsModule {}
