import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './components/about.component';
import { PrimaryBlockModule } from '../../shared/components/primary-block/primary-block.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [AboutComponent],
  imports: [CommonModule, AboutRoutingModule, PrimaryBlockModule, TranslateModule],
})
export class AboutModule {}
