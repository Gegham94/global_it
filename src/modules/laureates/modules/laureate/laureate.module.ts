import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LaureateRoutingModule } from './laureate-routing.module';
import { LaureateComponent } from './components/laureate.component';
import { PhotoSliderModule } from '../../../../shared/components/photo-slider/photo-slider.module';
import { VideoSliderModule } from '../../../../shared/components/video-slider/video-slider.module';
import { LoadingModule } from '../../../../shared/components/loading/loading.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [LaureateComponent],
  imports: [
    CommonModule,
    LaureateRoutingModule,
    LoadingModule,
    PhotoSliderModule,
    VideoSliderModule,
    TranslateModule,
  ],
})
export class LaureateModule {}
