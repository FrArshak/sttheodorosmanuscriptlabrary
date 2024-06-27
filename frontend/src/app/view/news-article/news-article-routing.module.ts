import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NewsComponent} from "./news/news-catalog/news.component";
import {NewsDetailComponent} from "./news/news-detail/news-detail.component";
import {ArticleCatalogComponent} from "./article/article-catalog/article-catalog.component";
import {ArticleDetailComponent} from "./article/article-detail/article-detail.component";

const routes: Routes = [
  {path: 'articles:/id', component: ArticleDetailComponent, data: { animation: 'ArticleDetailComponent' }},
  {path: 'articles', component: ArticleCatalogComponent, data: { animation: 'ArticleCatalogComponent' }},
  {path: 'news', component: NewsComponent, data: { animation: 'NewsComponent' }},
  {path: 'news:/id', component: NewsDetailComponent, data: { animation: 'NewsDetailComponent' }},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsArticleRoutingModule { }
