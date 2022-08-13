import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem, ProductItem } from 'src/app/interfaces/store';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  @Input() product = {} as ProductItem; //Product item to be viewed
  @Output() alterWishlistEmitter = new EventEmitter<ProductItem>(); //Emitter for wishlist action
  @Output() addToCartEmitter = new EventEmitter<CartItem>(); //Emiiter for add to cart action

  constructor(private _router: Router) {}
  //Deep copy for recieved object
  ngOnInit(): void {
    this.product = JSON.parse(JSON.stringify(this.product));
  }
  //Function called when wishlist is clicked to alter wishlist state and emit event to parent
  alterWishlist(): void {
    this.product.wishList = !this.product.wishList;
    this.alterWishlistEmitter.emit(this.product);
  }
  //Function called when add to cart button is clicked to emit event to parent
  addToCart(): void {
    this.addToCartEmitter.emit({ ...this.product, count: 1 });
  }
  //Function called when card is clicked to navigate to product details
  goToDetails(): void {
    this._router.navigate([`/store/details/${this.product.id}`]);
  }
}
