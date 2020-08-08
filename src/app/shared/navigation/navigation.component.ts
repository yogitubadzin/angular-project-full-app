import { AuthService } from './../../core/auth.service';
import { Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { CartProductService } from '../../core/cart-product.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  isLoggedIn: boolean;
  productsCounter: number;
  subscriptions: Subscription;
  productsCounter$: Observable<number>;

  constructor(
    private authService: AuthService,
    private cartProductService: CartProductService
  ) {
    this.subscriptions = new Subscription();
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.cartProductService.productsCounter$.subscribe((result) => {
        this.productsCounter = result;
      })
    );

    this.cartProductService.countProducts();
  }

  login() {
    this.authService.login();
  }
  logout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
