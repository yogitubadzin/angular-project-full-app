import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Product } from '../../models/Product';
import { RandomProductsService } from '../random-products.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-tile',
  templateUrl: './product-tile.component.html',
  styleUrls: ['./product-tile.component.scss']
})
export class ProductTileComponent implements OnInit {

  @Input()
  product: Product;
  subscription: Subscription;

  constructor(
    private randomProductsService: RandomProductsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id == undefined) {
      return;
    }

    this.subscription = this.randomProductsService
      .getProductById(id)
      .subscribe((data) => {
        this.product = data;
      });
  }
}
