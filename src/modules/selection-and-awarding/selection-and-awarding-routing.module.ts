import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelectionAndAwardingComponent } from './components/selection-and-awarding.component';

const routes: Routes = [{ path: '', component: SelectionAndAwardingComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectionAndAwardingRoutingModule {}
