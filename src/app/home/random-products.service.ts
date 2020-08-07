import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';

@Injectable()
export class RandomProductsService {
  private baseUrl = '/api/products';
  private dataStore = { randomProducts: [], totalPages: 0 };
  private randomProductsSubject$ = new BehaviorSubject<Product[]>([]);
  public randomProducts$ = this.randomProductsSubject$.asObservable();

  constructor(private httpService: HttpClient) {}

  public fetchFirstPageRandomProducts() {
    if (this.dataStore.totalPages > 0) {
      this.fetchRandomProductsPage();
      return;
    }

    this.fetchProducts(0);
  }

  public fetchRandomProductsPage() {
    const randomNumberPage = this.getRandomNumber(
      0,
      this.dataStore.totalPages - 1
    );
    const startPage = randomNumberPage * 3;
    this.fetchProducts(startPage);
  }
  private getRandomNumber(min: number, max: number) {
    return Math.round(Math.random() * (max - min) + min);
  }

  private fetchProducts(startPage: number) {
    let params = new HttpParams();
    params = params.append('_start', startPage.toString());
    params = params.append('_limit', '3');

    return this.httpService
      .get<Product[]>(this.baseUrl, { params, observe: 'response' })
      .pipe(
        tap((result) => {
          const totalCount = +result.headers.get('x-total-count');
          this.dataStore.totalPages = Math.ceil(totalCount / 3);
        }),
        map((result): Product[] => {
          return result.body;
        })
      )
      .subscribe((result) => {
        this.dataStore.randomProducts = result;
        this.randomProductsSubject$.next(this.dataStore.randomProducts);
      });
  }
}
