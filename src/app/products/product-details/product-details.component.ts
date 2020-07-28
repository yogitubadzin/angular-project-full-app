import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  product: Product;
  productSubscription$: Subscription;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.params['id'];

    this.productSubscription$ = this.productService
      .getProductById(productId)
      .subscribe((result) => {
        this.product = result;
      });
  }

  ngOnDestroy() {
    this.productSubscription$.unsubscribe();
  }
}
