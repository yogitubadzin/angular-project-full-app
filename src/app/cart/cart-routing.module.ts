import { CartFinishComponent } from './cart-finish/cart-finish.component';
import { CartListComponent } from './cart-list/cart-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';

const routes: Routes = [
  { path: '', component: CartListComponent },
  { path: 'add/:id', component: AddProductComponent },
  { path: 'finish', component: CartFinishComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartRoutingModule { }
