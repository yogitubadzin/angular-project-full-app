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
  private random: number;

  constructor() {
    this.random = Math.floor(Math.random() * (999999 - 100000)) + 100000;
  }

  public addProduct(product: Product) {
    return of(this.addProductToCart(product));
  }

  public fetchProducts() {
    const retrievedDataCart = localStorage.getItem(this.dataCart);
    const deserialisedDataCart = JSON.parse(retrievedDataCart);
    const cartProductItems = deserialisedDataCart.map(function (value) {
      return value[1];
    }) as CartProductItem[];

    this.productsSubject$.next(cartProductItems);
  }

  public buy() {
    localStorage.removeItem(this.dataCart);
  }

  public countProducts() {
    const retrievedDataCart = localStorage.getItem(this.dataCart);
    const deserialisedDataCart = JSON.parse(retrievedDataCart);
    let productsCounter = 0;
    deserialisedDataCart.map(function (value) {
      productsCounter += value[1].count;
    });

    let c = this.random;
    this.productsCounterSubject$.next(productsCounter);
  }

  private addProductToCart(product: Product) {
    const retrievedDataCart = localStorage.getItem(this.dataCart);
    let dataCartMap: Map<string, CartProductItem>;
    if (retrievedDataCart != null) {
      dataCartMap = new Map(JSON.parse(retrievedDataCart));
    } else {
      dataCartMap = new Map();
    }

    var cart = dataCartMap.get(product.id);
    if (cart != undefined) {
      cart.count = ++cart.count;
      dataCartMap.set(product.id, cart);
    } else {
      dataCartMap.set(product.id, {
        productId: product.id,
        count: 1,
        price: product.price,
        name: product.name,
      });
    }

    const dataCartToSave = JSON.stringify(Array.from(dataCartMap.entries()));
    localStorage.setItem(this.dataCart, dataCartToSave);
    this.countProducts();
  }
}