import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../product.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit {
  private filter: string;
  private productsSubscription: Subscription;
  products: Observable<Product[]>;
  selectedProduct: Product;
  totalItems: Observable<Number>;
  currentPage = 1;
  limitSize = 5;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.products = this.productService.products;
    this.totalItems = this.productService.totalCount;

    this.productsSubscription = this.products.subscribe((result) => {
      this.selectedProduct = result[0];
    });

    this.productService.fetchProducts(this.currentPage - 1, this.limitSize);
  }

  onClick(product: Product) {
    this.selectedProduct = product;
  }

  filterData(filter: string) {
    this.setFilter(filter);

    this.productService.fetchProducts(
      this.calculateStartPage(),
      this.limitSize,
      this.filter
    );
  }

  pageChanged(page: number): void {
    this.currentPage = page;
    this.filterData(this.filter);
  }

  ngDestroy() {
    this.productsSubscription.unsubscribe();
  }

  private calculateStartPage() {
    return (this.currentPage - 1) * this.limitSize;
  }

  private setFilter(filter: string) {
    this.filter = filter;
  }
}
