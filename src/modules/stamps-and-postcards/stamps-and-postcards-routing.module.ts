import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StampsAndPostcardsComponent } from './components/stamps-and-postcards.component';

const routes: Routes = [{ path: '', component: StampsAndPostcardsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StampsAndPostcardsRoutingModule {}
