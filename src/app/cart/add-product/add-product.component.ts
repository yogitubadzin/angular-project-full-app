import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';
import { CartProductService } from '../../core/cart-product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {
  showError: boolean;
  showSummary: boolean;

  constructor(
    private productService: ProductService,
    private cartService: CartProductService,
    private route: ActivatedRoute
  ) {
    const productId = this.route.snapshot.params['id'];

    this.process(productId);
  }

  ngOnInit(): void {}

  process(productId: string) {
    this.productService.getById(productId).subscribe(
      (product: Product) => {
        this.addProduct(product);
      },
      () => {
        this.showError = true;
      }
    );
  }

  addProduct(product: Product) {
    this.cartService.addProduct(product).subscribe(
      () => {
        this.showError = false;
        this.showSummary = true;
      },
      () => {
        this.showError = true;
      }
    );
  }
}
