import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminProductService } from '../admin-product.service';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.scss'],
})
export class ProductDeleteComponent implements OnInit {
  showSummary: boolean;
  showError: boolean;
  productId: string;

  constructor(
    private route: ActivatedRoute,
    private adminProductService: AdminProductService
  ) {
    this.productId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {}

  deleteProduct() {
    this.adminProductService.delete(this.productId).subscribe(
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
