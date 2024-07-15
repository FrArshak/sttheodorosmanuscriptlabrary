import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NewsComponent} from "./news/news-catalog/news.component";
import {NewsDetailComponent} from "./news/news-detail/news-detail.component";


const routes: Routes = [
  {path: 'articles/:id', component: NewsDetailComponent, data: { animation: 'ArticleDetailComponent' }},
  {path: 'articles', component: NewsComponent, data: { animation: 'ArticleCatalogComponent' }},
  {path: 'news', component: NewsComponent, data: { animation: 'NewsComponent' }},
  {path: 'news/:id', component: NewsDetailComponent, data: { animation: 'NewsDetailComponent' }},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsArticleRoutingModule { }
