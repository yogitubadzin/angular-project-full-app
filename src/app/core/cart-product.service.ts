import { LocalStorageService } from './local-storage.service';
import { CartProductItem } from '../models/cartProductItem';
import { Injectable } from '@angular/core';
import { of, BehaviorSubject, Subject } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class CartProductService {
  private dataCart = 'dataCart';
  private productsSubject$ = new BehaviorSubject<CartProductItem[]>([]);
  public products$ = this.productsSubject$.asObservable();
  private productsCounterSubject$ = new BehaviorSubject<number>(0);
  public productsCounter$ = this.productsCounterSubject$.asObservable();

  constructor(private localStorageService: LocalStorageService) {}

  public addProduct(product: Product) {
    return of(this.addProductToCart(product));
  }

  public fetchProducts() {
    const retrievedDataCart = this.localStorageService.getDataItem(
      this.dataCart
    );
    const cartProductItems = retrievedDataCart.map(function (value) {
      return value[1];
    }) as CartProductItem[];

    this.productsSubject$.next(cartProductItems);
  }

  public buy() {
    this.localStorageService.removeDataItem(this.dataCart);
    this.productsCounterSubject$.next(0);
  }

  public countProducts() {
    const retrievedDataCart = this.localStorageService.getDataItem(
      this.dataCart
    );
    if (retrievedDataCart == null) {
      return;
    }

    let productsCounter = 0;
    retrievedDataCart.map(function (value) {
      productsCounter += value[1].count;
    });

    this.productsCounterSubject$.next(productsCounter);
  }

  private addProductToCart(product: Product) {
    let dataCartMap = this.localStorageService.getDataItemMap(this.dataCart);

    var cart = dataCartMap.get(product.id);
    if (cart != undefined) {
      cart.count = ++cart.count;
      dataCartMap.set(product.id, cart);
    } else {
      dataCartMap.set(product.id, {
        productId: product.id,
        count: 1,
        price: product.price as number,
        name: product.name,
      });
    }

    this.localStorageService.setDataItem(this.dataCart, dataCartMap);

    this.countProducts();
  }
}
