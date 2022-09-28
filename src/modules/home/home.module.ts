import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlickCarouselModule } from 'ngx-slick-carousel';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/home.component';
import { PrimaryBlockModule } from '../../shared/components/primary-block/primary-block.module';
import { LaureatesSliderComponent } from './components/laureate-slider/laureate-slider.component';
import { PrimarySliderComponent } from './components/primary-slider/primary-slider.component';
import { HomeTestemonialsComponent } from './components/home-testemonials/home-testemonials.component';
import { HomeTestemonialComponent } from './components/home-testemonial/home-testemonial.component';
import { NewsComponent } from './components/news/news.component';
import { NewsApiService } from '../../shared/services/news-api.service';
import { TranslateModule } from '@ngx-translate/core';
import { LoadingModule } from '../../shared/components/loading/loading.module';

@NgModule({
  declarations: [
    HomeComponent,
    LaureatesSliderComponent,
    PrimarySliderComponent,
    HomeTestemonialsComponent,
    HomeTestemonialComponent,
    NewsComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    PrimaryBlockModule,
    SlickCarouselModule,
    TranslateModule,
    LoadingModule,
  ],
  providers: [NewsApiService],
})
export class HomeModule {}
