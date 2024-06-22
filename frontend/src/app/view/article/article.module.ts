import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticleRoutingModule } from './article-routing.module';
import {RouterModule} from "@angular/router";
import {DetailComponent} from "./detail/detail.component";
import {CatalogComponent} from "./catalog/catalog.component";


@NgModule({
  declarations: [
    DetailComponent,
    CatalogComponent

  ],
  imports: [
    CommonModule,
    RouterModule,
    ArticleRoutingModule
  ]
})
export class ArticleModule { }
