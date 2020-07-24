import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductFilterComponent } from './product-filter/product-filter.component';
import { ProductService } from './product.service';

@NgModule({
  declarations: [
    ProductsListComponent,
    ProductDetailsComponent,
    ProductFilterComponent,
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PaginationModule,
    HttpClientModule,
    SharedModule
  ],
  exports: [
    ProductsListComponent,
    ProductDetailsComponent,
    ProductFilterComponent,
  ],
  providers:[ProductService]
})
export class ProductsModule {}
