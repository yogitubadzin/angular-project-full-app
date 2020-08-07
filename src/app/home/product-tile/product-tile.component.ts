import { Input, OnInit, Component } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ActivatedRoute } from '@angular/router';
import { RandomProductsService } from '../random-products.service';

@Component({
  selector: 'app-product-tile',
  templateUrl: './product-tile.component.html',
  styleUrls: ['./product-tile.component.scss'],
})
export class ProductTileComponent implements OnInit {
  @Input()
  product: Product;

  constructor() {}

  ngOnInit(): void {}
}
