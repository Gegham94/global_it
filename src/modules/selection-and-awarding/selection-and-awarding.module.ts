import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SelectionAndAwardingRoutingModule } from './selection-and-awarding-routing.module';
import { SelectionAndAwardingComponent } from './components/selection-and-awarding.component';
import { TranslateModule } from '@ngx-translate/core';
import { PrimaryBlockModule } from '../../shared/components/primary-block/primary-block.module';

@NgModule({
  declarations: [SelectionAndAwardingComponent],
  imports: [CommonModule, SelectionAndAwardingRoutingModule, TranslateModule, PrimaryBlockModule],
})
export class SelectionAndAwardingModule {}
