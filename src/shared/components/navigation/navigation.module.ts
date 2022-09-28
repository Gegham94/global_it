import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { NavigationComponent } from './components/navigation.component';
import { SelectModule } from '../select/select.module';
import { ToastrService } from 'ngx-toastr';

@NgModule({
  declarations: [NavigationComponent],
  exports: [NavigationComponent],
  imports: [CommonModule, TranslateModule.forChild(), RouterModule, FormsModule, SelectModule],
  providers: [ToastrService],
})
export class NavigationModule {}
