import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsComponent } from './components/news.component';

const routes: Routes = [
  {
    path: '',
    component: NewsComponent,
  },
  {
    path: ':slug',
    loadChildren: () =>
      import('./modules/news-view/news-view.module').then((m) => m.NewsViewModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewsRoutingModule {}
