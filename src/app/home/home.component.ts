import { Component, OnInit } from '@angular/core';
import { ProductService } from '../core/product.service';
import { Subscription, interval } from 'rxjs';
import { Product } from '../models/Product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  allProducts: Product[];
  productsToDisplay: Product[] = [];
  productsSubscription: Subscription;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productsSubscription = this.productService.products.subscribe(
      (result) => {
        this.allProducts = result;
        this.displayRandomProducts();
      }
    );

    this.productService.fetchProducts();

    const randomProductsInterval = interval(10000);
    randomProductsInterval.subscribe(() => {
      this.displayRandomProducts();
    });
  }

  displayRandomProducts() {
    this.productsToDisplay = this.allProducts
      .sort(() => Math.random() - Math.random())
      .slice(0, 3);
  }

  ngOnDestroy() {
    this.productsSubscription.unsubscribe();
  }
}
