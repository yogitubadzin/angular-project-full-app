import { ProductService } from './product.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartListComponent } from './cart-list/cart-list.component';
import { AddProductComponent } from './add-product/add-product.component';
import { CartFinishComponent } from './cart-finish/cart-finish.component';

@NgModule({
  declarations: [
    CartListComponent,
    AddProductComponent,
    AddProductComponent,
    CartFinishComponent,
  ],
  imports: [CommonModule, CartRoutingModule],
  providers: [ProductService],
})
export class CartModule {}
