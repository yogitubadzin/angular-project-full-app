import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { CartProductItem } from 'src/app/models/cartProductItem';
import { CartProductService } from 'src/app/core/cart-product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss'],
})
export class CartListComponent implements OnInit {
  products: CartProductItem[];
  numberOfProducts = 0;
  overallPrice = 0;
  productsSubscription$: Subscription;

  constructor(private cartService: CartProductService, private router: Router) {
    this.productsSubscription$ = new Subscription();
  }

  ngOnInit(): void {
    this.productsSubscription$.add(
      this.cartService.products$.subscribe((result) => {
        this.numberOfProducts = 0;
        this.overallPrice = 0;
        this.products = result;
        this.products.forEach((product) => {
          this.numberOfProducts = this.numberOfProducts + product.count;
          this.overallPrice =
            +product.price * product.count + this.overallPrice;
        });
      })
    );

    this.cartService.fetchProducts();
  }

  buyProducts() {
    this.cartService.buy();
    this.router.navigate(['/cart/finish']);
  }

  ngOnDestroy() {
    this.productsSubscription$.unsubscribe();
  }
}
