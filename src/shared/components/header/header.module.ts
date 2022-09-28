import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header.component';
import { FormsModule } from '@angular/forms';
import { DirectiveModule } from '../../directives/directives.module';
import { SelectModule } from '../select/select.module';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    RouterModule,
    ToastrModule,
    FormsModule,
    DirectiveModule,
    SelectModule,
  ],
  exports: [HeaderComponent],
  providers: [ToastrService],
})
export class HeaderModule {}
