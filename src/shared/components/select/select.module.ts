import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectComponent } from './components/select.component';
import { DirectiveModule } from '../../directives/directives.module';

@NgModule({
  declarations: [SelectComponent],
  imports: [CommonModule, DirectiveModule],
  exports: [SelectComponent],
})
export class SelectModule {}
