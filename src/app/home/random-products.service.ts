import { Product } from '../models/Product';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { HomeModule } from './home.module';
import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: HomeModule,
// })
@Injectable()
export class RandomProductsService {
  private _baseUrl = '/api/products';
  private _dataStore: { products: Product[]; totalCount: number } = {
    products: [],
    totalCount: 0,
  };
  private _products: BehaviorSubject<Product[]> = new BehaviorSubject<
    Product[]
  >([]);
  private _totalCount: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public products = this._products.asObservable();
  public totalCount = this._totalCount.asObservable();

  constructor(private httpService: HttpClient) {}

  public getProductById(id: string): Observable<Product> {
    return this.httpService.get<Product>(`${this._baseUrl}/${id}`);
  }

  public fetchProducts() {
    return this.httpService
      .get<Product[]>(this._baseUrl, { observe: 'response' })
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
