import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollUpButtonComponent } from './components/scroll-up-button.component';

@NgModule({
  declarations: [ScrollUpButtonComponent],
  exports: [ScrollUpButtonComponent],
  imports: [CommonModule],
})
export class ScrollUpButtonModule {}
