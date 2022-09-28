import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsViewRoutingModule } from './news-view-routing.module';
import { NewsViewComponent } from './components/news-view.component';
import { PhotoSliderModule } from '../../../../shared/components/photo-slider/photo-slider.module';
import { VideoSliderModule } from '../../../../shared/components/video-slider/video-slider.module';
import { LoadingModule } from '../../../../shared/components/loading/loading.module';
import { PipesModule } from '../../../../shared/pipes/pipes.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [NewsViewComponent],
  imports: [
    CommonModule,
    NewsViewRoutingModule,
    PhotoSliderModule,
    VideoSliderModule,
    LoadingModule,
    PipesModule,
    TranslateModule,
  ],
})
export class NewsViewModule {}
