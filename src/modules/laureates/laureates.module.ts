import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LaureatesRoutingModule } from './laureates-routing.module';
import { LaureatesComponent } from './components/laureates.component';
import { PrimaryBlockModule } from '../../shared/components/primary-block/primary-block.module';
import { NewsApiService } from '../../shared/services/news-api.service';
import { TranslateModule } from '@ngx-translate/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { LoadingModule } from '../../shared/components/loading/loading.module';

@NgModule({
  declarations: [LaureatesComponent],
  imports: [
    CommonModule,
    LaureatesRoutingModule,
    TranslateModule.forChild(),
    PrimaryBlockModule,
    InfiniteScrollModule,
    LoadingModule,
  ],
  providers: [NewsApiService],
})
export class LaureatesModule {}
