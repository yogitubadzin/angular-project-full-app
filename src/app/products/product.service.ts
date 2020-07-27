import { Product } from '../models/product';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()
export class ProductService {
  private baseUrl = '/api/products';
  private dataStore: { products: Product[]; totalCount: number } = {
    products: [],
    totalCount: 0,
  };
  private productsSubject = new BehaviorSubject<Product[]>([]);
  private totalCountSubject = new BehaviorSubject<number>(0);
  public products = this.productsSubject.asObservable();
  public totalCount = this.totalCountSubject.asObservable();

  constructor(private httpService: HttpClient) {}

  public getProductById(id: string): Observable<Product> {
    return this.httpService.get<Product>(`${this.baseUrl}/${id}`);
  }

  public fetchProducts(
    startPage: number = null,
    limitSize: number = null,
    searchFilter: string = null
  ) {
    let params = new HttpParams();

    if (startPage != null) {
      params = params.append('_start', startPage.toString());
    }

    if (limitSize != null) {
      params = params.append('_limit', limitSize.toString());
    }

    if (searchFilter != null) {
      params = params.append('q', searchFilter);
    }

    return this.httpService
      .get<Product[]>(this.baseUrl, { params, observe: 'response' })
      .pipe(
        tap((result) => {
          this.dataStore.totalCount = +result.headers.get('x-total-count');
          this.dataStore.products = result.body;
          return result.body;
        })
      )
      .subscribe((result) => {
        this.dataStore.products = result.body;
        this.productsSubject.next(this.dataStore.products);
        this.totalCountSubject.next(this.dataStore.totalCount);
      });
  }
}
