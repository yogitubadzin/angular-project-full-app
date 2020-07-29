import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductAddComponent } from './product-add/product-add.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductDeleteComponent } from './product-delete/product-delete.component';
import { ProductsComponent } from './products/products.component';
import { MessageListComponent } from './message-list/message-list.component';
import { MessageDetailsComponent } from './message-details/message-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { AdminContactService } from './admin-contact.service';

@NgModule({
  declarations: [
    DashboardComponent,
    ProductFormComponent,
    ProductAddComponent,
    ProductEditComponent,
    ProductDeleteComponent,
    ProductsComponent,
    MessageListComponent,
    MessageDetailsComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PaginationModule,
    HttpClientModule,
    SharedModule,
  ],
  providers: [AdminContactService],
})
export class AdminModule {}
