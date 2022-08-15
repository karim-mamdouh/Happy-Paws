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
    this.product = { ...this.product };
  }
  //Function called when wishlist is clicked to alter wishlist state and emit event to parent
  //If user isn't logged in it redirect user to login screen
  alterWishlist(): void {
    if (localStorage.getItem('userID')) {
      this.product.wishList = !this.product.wishList;
      this.alterWishlistEmitter.emit(this.product);
    } else {
      this._router.navigate(['/auth/login']);
    }
  }
  //Function called when add to cart button is clicked to emit event to paren
  //If user isn't logged in it redirect user to login screen
  addToCart(): void {
    if (localStorage.getItem('userID')) {
      this.addToCartEmitter.emit({ ...this.product, count: 1 });
    } else {
      this._router.navigate(['/auth/login']);
    }
  }
  //Function called when card is clicked to navigate to product details
  goToDetails(): void {
    this._router.navigate([`/store/details/${this.product.id}`]);
  }
}
