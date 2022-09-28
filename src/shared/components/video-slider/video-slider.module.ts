import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { LightboxModule } from 'ng-gallery/lightbox';
import { PipesModule } from '../../pipes/pipes.module';
import { VideoSliderComponent } from './components/video-slider.component';

@NgModule({
  declarations: [VideoSliderComponent],
  exports: [VideoSliderComponent],
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    RouterModule,
    SlickCarouselModule,
    PipesModule,
    // GalleryModule.withConfig({
    //   thumbView: 'default',
    //   gestures: true,
    //   imageSize: ImageSize.Cover,
    //   loadingStrategy: 'preload',
    //   thumbPosition: ThumbnailsPosition.Bottom,
    //   disableThumb: true,
    // }),
    LightboxModule.withConfig({
      hasBackdrop: true,
      backdropClass: 'gallery-backdrop-blur',
      keyboardShortcuts: true,
    }),
  ],
})
export class VideoSliderModule {}
