import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination';

import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './ProductService';
import { ContactService } from './ContactService';

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule, PaginationModule.forRoot()],
  providers: [ProductService, ContactService],
})
export class CoreModule {}
