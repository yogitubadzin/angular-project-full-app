import { AdminProductService } from './../admin-product.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss'],
})
export class ProductEditComponent implements OnInit {
  showError: boolean;
  product: Product;
  productSubscription: Subscription;

  constructor(
    private adminProductService: AdminProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const productId = this.route.snapshot.params['id'];

    this.productSubscription = this.adminProductService
      .getById(productId)
      .subscribe((result) => {
        this.product = result;
      });
  }

  onSubmitForm(product: Product) {
    this.adminProductService.update(product).subscribe(
      () => {
        this.router.navigate(['/products']);
      },
      () => {
        this.showError = true;
      }
    );
  }
}
