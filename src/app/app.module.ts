import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { HomeModule } from './Home/home.module';
import { SharedModule } from './shared/shared.module';
import { ProductsModule } from './products/products.module';
import { CoreModule } from './core/core.module';
import { ContactModule } from './contact/contact.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    SharedModule,
    CoreModule,
    ProductsModule,
    ContactModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
