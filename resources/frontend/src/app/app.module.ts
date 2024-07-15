import {NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule } from '@angular/material/snack-bar';
import { MAT_MENU_DEFAULT_OPTIONS ,MatMenuModule } from '@angular/material/menu';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { HTTP_INTERCEPTORS ,HttpClientModule } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { RouterModule } from '@angular/router';
import { AuthInterceptor } from './core/auth-interceptor';
import {NewsArticleModule} from "./view/news-article/news-article.module";
import {CommonModule} from "@angular/common";
import {LoaderComponent} from "./shared/components/loader/loader.component";
import { provideCharts, withDefaultRegisterables} from 'ng2-charts';
import {FooterComponent} from "./shared/layout/footer/footer.component";

@NgModule({
  declarations: [AppComponent],
  imports: [
    LoaderComponent,
    BrowserModule,
    CommonModule,
    SharedModule,
    NewsArticleModule,
    HttpClientModule,
    ReactiveFormsModule,
    FooterComponent,
    MatMenuModule,
    BrowserAnimationsModule,
    RouterModule,
    MatSnackBarModule,
    AppRoutingModule,

  ],
  providers: [
    // {provide: provideRouter}
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2500 } },
    { provide: MAT_MENU_DEFAULT_OPTIONS, useValue: { duration: 2500 } },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    provideAnimationsAsync(),
    provideCharts(withDefaultRegisterables()),
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]

})
export class AppModule {}
