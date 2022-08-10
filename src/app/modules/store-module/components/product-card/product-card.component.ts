import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem, ProductItem } from 'src/app/interfaces/store';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  @Input() product = {} as ProductItem;
  @Output() alterWishlistEmitter = new EventEmitter<ProductItem>();
  @Output() addToCartEmitter = new EventEmitter<CartItem>();

  constructor(private _router: Router) {}

  ngOnInit(): void {
    this.product = JSON.parse(JSON.stringify(this.product));
  }
  alterWishlist(): void {
    this.product.wishList = !this.product.wishList;
    this.alterWishlistEmitter.emit(this.product);
  }
  addToCart(): void {
    this.addToCartEmitter.emit({ ...this.product, count: 1 });
  }
  goToDetails(): void {
    this._router.navigate([`/store/details/${this.product.id}`]);
  }
}
