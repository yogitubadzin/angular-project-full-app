import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { Subscription, interval } from 'rxjs';
import { RandomProductsService } from '../random-products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  allProducts: Product[];
  productsToDisplay: Product[] = [];
  productsSubscription: Subscription;

  constructor(private randomProductService: RandomProductsService) {}

  ngOnInit(): void {
    this.productsSubscription = this.randomProductService.products.subscribe(
      (result) => {
        this.allProducts = result;
        this.displayRandomProducts();
      }
    );

    this.randomProductService.fetchProducts();

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
