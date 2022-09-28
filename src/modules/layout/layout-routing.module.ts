import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('../home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'laureates',
        loadChildren: () => import('../laureates/laureates.module').then((m) => m.LaureatesModule),
      },
      {
        path: 'news',
        loadChildren: () => import('../news/news.module').then((m) => m.NewsModule),
      },
      {
        path: 'about',
        loadChildren: () => import('../about/about.module').then((m) => m.AboutModule),
      },
      {
        path: 'committee',
        loadChildren: () => import('../committee/committee.module').then((m) => m.CommitteeModule),
      },
      {
        path: 'stamps-and-postcards',
        loadChildren: () =>
          import('../stamps-and-postcards/stamps-and-postcards.module').then(
            (m) => m.StampsAndPostcardsModule,
          ),
      },
      {
        path: 'selection-and-awarding',
        loadChildren: () =>
          import('../selection-and-awarding/selection-and-awarding.module').then(
            (m) => m.SelectionAndAwardingModule,
          ),
      },
      {
        path: 'partners',
        loadChildren: () => import('../partners/partners.module').then((m) => m.PartnersModule),
      },
      {
        path: 'search',
        loadChildren: () => import('../search/search.module').then((m) => m.SearchModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
