import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';

@Injectable()
export class ProductService {
  private baseUrl = '/api/products';

  constructor(private httpService: HttpClient) {}

  public getById(id: string): Observable<Product> {
    return this.httpService.get<Product>(`${this.baseUrl}/${id}`);
  }

  public update(product: Product) {
    return this.httpService.put<Product>(`${this.baseUrl}/${product.id}`, product);
  }

  public delete(productId: string) {
    return this.httpService.delete(`${this.baseUrl}/${productId}`);
  }
}
