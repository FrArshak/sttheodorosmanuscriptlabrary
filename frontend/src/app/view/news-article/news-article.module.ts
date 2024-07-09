import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsArticleRoutingModule } from './news-article-routing.module';
import {CardComponent} from "../../shared/components/card/card.component";
import {AdminModalComponent} from "../../shared/components/admin-modal/admin-modal.component";
import {NewsComponent} from "./news/news-catalog/news.component";
import {NewsDetailComponent} from "./news/news-detail/news-detail.component";
import {SharedModule} from "../../shared/shared.module";
import {ModalComponent} from "../../shared/components/modal/modal.component";


@NgModule({
  declarations: [NewsComponent, NewsDetailComponent],
    imports: [
        CommonModule,
        CardComponent,
        SharedModule,
        AdminModalComponent,
        NewsArticleRoutingModule,
        ModalComponent
    ]
})
export class NewsArticleModule { }
