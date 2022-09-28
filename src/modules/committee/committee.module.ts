import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { CommitteeRoutingModule } from './committee-routing.module';
import { CommitteeComponent } from './components/committee.component';
import { NewsApiService } from '../../shared/services/news-api.service';
import { PrimaryBlockModule } from '../../shared/components/primary-block/primary-block.module';
import { LoadingModule } from '../../shared/components/loading/loading.module';

@NgModule({
  declarations: [CommitteeComponent],
  imports: [
    CommonModule,
    CommitteeRoutingModule,
    TranslateModule,
    PrimaryBlockModule,
    LoadingModule,
  ],
  providers: [NewsApiService],
})
export class CommitteeModule {}
