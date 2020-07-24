import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination';

import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './product.service';
import { ContactService } from './contact.service';

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule, PaginationModule.forRoot()],
  providers: [ProductService, ContactService],
})
export class CoreModule {}
