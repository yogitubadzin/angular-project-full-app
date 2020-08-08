import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AdminProductService {
  private baseUrl = '/api/products';

  constructor(private httpService: HttpClient) {}

  public create(product: Product) {
    return this.httpService.post<Product>(this.baseUrl, product);
  }

  public update(product: Product) {
    return this.httpService.put<Product>(`${this.baseUrl}/${product.id}`, product);
  }

  public getById(id: string): Observable<Product> {
    return this.httpService.get<Product>(`${this.baseUrl}/${id}`);
  }
}
