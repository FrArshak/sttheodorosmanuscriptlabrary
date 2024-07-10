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
  {
    path: '',
    loadChildren: () =>
      import('./view/scripts-catalogs/scripts-catalogs.module').then(
        (m) => m.ScriptsCatalogsModule
      ),
    data: { animation: 'ScriptsCatalogLoginPage' },
  },
  {
    path: '',
    loadChildren: () =>
      import('./view/admin/admin.module').then((m) => m.AdminModule),
    data: {animation: 'AdminPage'}

  },
  {
    path: '',
    loadChildren: () =>
      import('./view/contact-about/contact-about.module').then((m) => m.ContactAboutModule),
    data: {animation: 'ContactAbout'}

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
