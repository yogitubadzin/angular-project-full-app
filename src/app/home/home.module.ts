import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';

import { HomeRoutingModule } from './home-routing.module';
import { HomePageComponent } from './home-page/home-page.component';
import { ProductTileComponent } from './product-tile/product-tile.component';
import { RandomProductsService } from './random-products.service';

@NgModule({
  declarations: [HomePageComponent, ProductTileComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [HomePageComponent, ProductTileComponent],
  providers: [RandomProductsService]
})
export class HomeModule {}
