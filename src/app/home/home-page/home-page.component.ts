import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { Subscription, interval } from 'rxjs';
import { RandomProductsService } from '../random-products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  private randomProductsSubscription: Subscription;
  private randomProductsIntervalSubscription: Subscription;
  productsToDisplay: Product[] = [];

  constructor(private randomProductService: RandomProductsService) {}

  ngOnInit(): void {
    this.randomProductsSubscription = this.randomProductService.randomProducts.subscribe(
      (result) => {
        this.productsToDisplay = result;
      }
    );

    this.randomProductService.fetchFirstPageRandomProducts();

    const randomProductsInterval = interval(10000);
    this.randomProductsIntervalSubscription = randomProductsInterval.subscribe(
      () => {
        this.randomProductService.fetchRandomProductsPage();
      }
    );
  }

  ngOnDestroy() {
    this.randomProductsSubscription.unsubscribe();
    this.randomProductsIntervalSubscription.unsubscribe();
  }
}
