import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './components/search.component';
import { NewsApiService } from '../../shared/services/news-api.service';
import { LoadingModule } from '../../shared/components/loading/loading.module';

@NgModule({
  declarations: [SearchComponent],
  imports: [CommonModule, SearchRoutingModule, TranslateModule, LoadingModule],
  providers: [NewsApiService],
})
export class SearchModule {}
