import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  @Input()
  product: Product;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];

    this.productService.getProductById(id).subscribe((data) => {
      this.product = data;
    });
  }
}
