import { AdminProductService } from './../admin-product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss'],
})
export class ProductAddComponent implements OnInit {
  showError: boolean;

  constructor(
    private adminProductService: AdminProductService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmitForm(product: Product) {
    this.adminProductService.create(product).subscribe(
      () => {
        this.router.navigate(['/products']);
      },
      () => {
        this.showError = true;
      }
    );
  }
}
