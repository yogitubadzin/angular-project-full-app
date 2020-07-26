import { Injectable } from '@angular/core';
import { Product } from '../models/Product';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable()
export class RandomProductsService {
  private baseUrl = '/api/products';
  private dataStore = { products: [], totalCount: 0 };
  private productsSubject = new BehaviorSubject<Product[]>([]);
  private totalCountSubject = new BehaviorSubject<number>(0);
  public products = this.productsSubject.asObservable();
  public totalCount = this.totalCountSubject.asObservable();

  constructor(private httpService: HttpClient) {}

  public getProductById(id: string): Observable<Product> {
    return this.httpService.get<Product>(`${this.baseUrl}/${id}`);
  }

  public fetchProducts() {
    return this.httpService
      .get<Product[]>(this.baseUrl, { observe: 'response' })
      .pipe(
        tap((result) => {
          this.dataStore.products = result.body;
          this.dataStore.totalCount = +result.headers.get('x-total-count');
        })
      )
      .subscribe(() => {
        this.productsSubject.next(this.dataStore.products);
        this.totalCountSubject.next(this.dataStore.totalCount);
      });
  }
}
