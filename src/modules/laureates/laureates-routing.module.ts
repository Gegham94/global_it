import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LaureatesComponent } from './components/laureates.component';

const routes: Routes = [
  {
    path: '',
    component: LaureatesComponent,
  },
  {
    path: ':slug',
    loadChildren: () => import('./modules/laureate/laureate.module').then((m) => m.LaureateModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LaureatesRoutingModule {}
