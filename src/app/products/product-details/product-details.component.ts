import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  @Input()
  productId: string;
  product: Product;
  productSubscription$: Subscription;
  isLoaded: boolean;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {}

  ngOnChanges() {
    this.productSubscription$ = this.productService
      .getProductById(this.productId)
      .subscribe((result) => {
        this.product = result;
        this.isLoaded = true;
      });
  }

  ngOnDestroy() {
    this.productSubscription$.unsubscribe();
    this.isLoaded = false;
  }
}
