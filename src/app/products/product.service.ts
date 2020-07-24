import { Product } from '../models/Product';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ProductsModule } from './products.module';
import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: ProductsModule,
// })
@Injectable()
export class ProductService {
  private _baseUrl = '/api/products';
  private _dataStore: { products: Product[]; totalCount: number } = { products: [], totalCount: 0, };
  private _products: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  private _totalCount: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public products = this._products.asObservable();
  public totalCount = this._totalCount.asObservable();

  constructor(private httpService: HttpClient) {}

  public getProductById(id: string): Observable<Product> {
    return this.httpService.get<Product>(`${this._baseUrl}/${id}`);
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
      .get<Product[]>(this._baseUrl, { params, observe: 'response' })
      .pipe(
        map((result) => {
          this._dataStore.products = result.body;
          this._dataStore.totalCount = +result.headers.get('x-total-count');
        })
      )
      .subscribe(() => {
        this._products.next(this._dataStore.products);
        this._totalCount.next(this._dataStore.totalCount);
      });
  }
}
