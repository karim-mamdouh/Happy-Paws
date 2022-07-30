import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CartItem, ProductItem } from 'src/app/interfaces/store';
import { addToCart, addToWishList } from 'src/app/store/store/store-actions';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  private _product: ProductItem = {} as ProductItem;
  rating: number | undefined = 0;

  @Input('product')
  set product(product: ProductItem) {
    this.rating = product.rate;
    this._product = product;
  }

  get product() {
    return this._product;
  }

  constructor(
    private store: Store<{ store: { products: Array<ProductItem>, wishList: Array<ProductItem>, cart: Array<CartItem> } }>,
    private _router: Router,
  ) {
    this.rating = this.product?.rate;

  }

  ngOnInit(): void {
  }

  onAddToCartClick(event: Event, product: ProductItem) {
    console.log("add to Cart Button clicked");

    let temp = JSON.parse(JSON.stringify(product)) as CartItem;
    temp.count = 1;
    this.store.dispatch(addToCart({ payload: temp }))
  }

  onAddToWishlistClick(event: Event, product: ProductItem) {
    console.log("add to Wishlist Button clicked");
    this.store.dispatch(addToWishList({ payload: product }));
  }

  onCardClick(event: Event, product: ProductItem): void {
    console.log("card clicked");
    this._router.navigate([`/store/details`], {
      queryParams: {
        product: JSON.stringify(product)
      },
    });
  }
}
