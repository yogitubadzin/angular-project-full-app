import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { Subscription, interval } from 'rxjs';
import { RandomProductsService } from '../random-products.service';
import { concatMap } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  private subscriptions: Subscription;
  productsToDisplay: Product[] = [];

  constructor(private randomProductService: RandomProductsService) {
    this.subscriptions = new Subscription();
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.randomProductService.randomProducts.subscribe((result) => {
        this.productsToDisplay = result;
      })
    );

    this.randomProductService.fetchFirstPageRandomProducts();

    this.subscriptions.add(
      interval(10000)
        .pipe(
          concatMap(async () =>
            this.randomProductService.fetchRandomProductsPage()
          )
        )
        .subscribe()
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
