import { Component, Input, OnInit } from '@angular/core';
import { ProductItem } from 'src/app/interfaces/store';
@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  private _product: ProductItem = {} as ProductItem;
  rating: number | undefined = 0;

  @Input('product')
  set product(value: ProductItem) {
    this.rating = value.rate;
    this._product = value;
  }

  get product() {
    return this._product;
  }

  constructor() {
    this.rating = this.product?.rate;
  }

  ngOnInit(): void {
  }

}
