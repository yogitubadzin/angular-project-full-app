import { Input, OnInit, Component } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { RandomProductsService } from '../random-products.service';

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
