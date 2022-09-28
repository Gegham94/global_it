import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimaryBlockComponent } from './components/primary-block.component';

@NgModule({
  declarations: [PrimaryBlockComponent],
  imports: [CommonModule],
  exports: [PrimaryBlockComponent],
})
export class PrimaryBlockModule {}
