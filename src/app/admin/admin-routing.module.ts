import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductDeleteComponent } from './product-delete/product-delete.component';
import { ProductAddComponent } from './product-add/product-add.component';
import { MessageListComponent } from './message-list/message-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { MessageDetailsComponent } from './message-details/message-details.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'messages', component: MessageListComponent },
  { path: 'messages/:id', component: MessageDetailsComponent },
  { path: 'products/create', component: ProductAddComponent },
  { path: 'products/delete/:id', component: ProductDeleteComponent },
  { path: 'products/edit/:id', component: ProductEditComponent },
  { path: 'products', component: ProductsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
