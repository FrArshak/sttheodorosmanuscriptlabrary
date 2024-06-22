import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DetailComponent} from "./detail/detail.component";
import {CatalogComponent} from "./catalog/catalog.component";

const routes: Routes = [
  {path: 'articles', component: CatalogComponent, data: {animation: 'ArticlesPage'}},
  {path: 'article/:id', component: DetailComponent, data: {animation: 'ArticlePage'}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticleRoutingModule { }
