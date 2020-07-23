import { Injectable } from '@angular/core';
import { Product } from '../models/Product';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private _baseUrl = '/api/products';
  private _dataStore: { products: Product[], totalCount: number } = { products: [], totalCount: 0 };
  private _products: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  private _totalCount: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public products = this._products.asObservable();
  public totalCount = this._totalCount.asObservable();

  constructor(private httpService: HttpClient) {  }

  public getProductById(id: string) : Observable<Product> {
    return this.httpService.get<Product>(`${this._baseUrl}/${id}`);
  }

  public fetchProducts(){
    return this.getProducts(this._baseUrl);
  }

  public fetchProductsWithPaging(startPage: number, limitSize: number){
    return this.getProducts(`${this._baseUrl}?_start=${startPage}&_limit=${limitSize}`);
  }

  public fetchProductsWithPagingAndFilter(startPage: number, limitSize: number, searchFilter: string){
    return this.getProducts(`${this._baseUrl}?_start=${startPage}&_limit=${limitSize}&q=${searchFilter}`);
  }

  private getProducts(url) {
    return this.httpService.get<Product[]>(url,  {observe: 'response'}).pipe(
      map(result =>{
        this._dataStore.products = result.body;
        this._dataStore.totalCount = +result.headers.get('x-total-count');
      })
    ).subscribe(()=>{
      this._products.next(Object.assign({}, this._dataStore).products);
      this._totalCount.next(this._dataStore.totalCount);
    });
  }
}
