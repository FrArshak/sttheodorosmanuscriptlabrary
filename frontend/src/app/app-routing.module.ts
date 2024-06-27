import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './view/main/main.component';

const routes: Routes = [
  { path: '', component: MainComponent, data: { animation: 'Homepage' } },
  {
    path: '',
    loadChildren: () =>
      import('./view/news-article/news-article.module').then((m) => m.NewsArticleModule),
    data: { animation: 'ArticlePage' },
  },
  {
    path: '',
    loadChildren: () =>
      import('./view/admin-login/admin-login.module').then(
        (m) => m.AdminLoginModule
      ),
    data: { animation: 'AdminLoginPage' },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
