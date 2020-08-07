import {  } from '@angular/common/http';
import { HomeRoutingModule } from './home-routing.module';
import { ProductTileComponent } from './product-tile/product-tile.component';
import { HomePageComponent } from './home-page/home-page.component';
import { NgModule } from '@angular/core';
import { RandomProductsService } from './random-products.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [HomePageComponent, ProductTileComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [HomePageComponent, ProductTileComponent],
  providers: [RandomProductsService]
})
export class HomeModule {}
