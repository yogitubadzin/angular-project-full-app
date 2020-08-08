import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductGlobalService {
  private baseUrl = '/api/products';

  constructor(private httpService: HttpClient) {}

  public delete(productId: string) {
    return this.httpService.delete(`${this.baseUrl}/${productId}`);
  }
}
