import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LightboxModule } from 'ng-gallery/lightbox';

import { StampsAndPostcardsRoutingModule } from './stamps-and-postcards-routing.module';
import { StampsAndPostcardsComponent } from './components/stamps-and-postcards.component';
import { PrimaryBlockModule } from '../../shared/components/primary-block/primary-block.module';
import { PhotoSliderModule } from '../../shared/components/photo-slider/photo-slider.module';
import { GalleryModule } from 'ng-gallery';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [StampsAndPostcardsComponent],
  imports: [
    CommonModule,
    StampsAndPostcardsRoutingModule,
    GalleryModule,
    LightboxModule,
    PrimaryBlockModule,
    PhotoSliderModule,
    TranslateModule,
  ],
})
export class StampsAndPostcardsModule {}
