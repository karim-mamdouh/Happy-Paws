import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CartItem, ProductItem } from 'src/app/interfaces/store';
import { DatabaseService } from 'src/app/services/database.service';
import { addToCart, resetWishList } from 'src/app/store/store/store-actions';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  private _product: ProductItem = {} as ProductItem;
  rating: number | undefined = 0;
  wishlist: Array<ProductItem> = [];
  @Input('product')
  set product(product: ProductItem) {
    this.rating = product.rate;
    this._product = JSON.parse(JSON.stringify(product));;
  }

  get product() {
    return this._product;
  }

  constructor(
    private _store: Store<{ store: { products: Array<ProductItem>, wishList: Array<ProductItem>, cart: Array<CartItem> } }>,
    private _router: Router,
    private _firestoreService: DatabaseService,
  ) {
    this.rating = this.product?.rate;
    this._store.select('store').subscribe(res => {
      this.wishlist = JSON.parse(JSON.stringify(res.wishList));
    })
  }

  ngOnInit(): void {
  }

  onAddToCartClick(event: Event, product: ProductItem) {
    console.log("add to Cart Button clicked");

    let temp = JSON.parse(JSON.stringify(product)) as CartItem;
    temp.count = 1;
    this._store.dispatch(addToCart({ payload: temp }))
  }

  onAddToWishlistClick(event: Event, product: ProductItem) {
    // if product already in wishlist 
    // Remove the product
    if (product.wishList) {
      // Get index of the product inside wishlist
      const index = this.wishlist.findIndex(item => item.id === product.id);

      // remove from local wishlist
      this.wishlist.splice(index, 1);

      // update firebase with the new wishlist state

      this._firestoreService.removeFromWishlist(localStorage.getItem('userID')!, this.wishlist).then(res => {
        this._store.dispatch(resetWishList());
      })

    }
    // if product is not in wishlist 
    else {
      // Change wishlist flag state 
      this.product.wishList = true;
      // Add the product to local wishlist
      this.wishlist = [...this.wishlist, product];
      // update firebase with the new wishlist state
      this._firestoreService.addToWishlist(localStorage.getItem('userID')!, this.wishlist).then(res => {
        this._store.dispatch(resetWishList());
      })
    }

  }

  onCardClick(event: Event, product: ProductItem): void {
    this._router.navigate([`/store/details`], {
      queryParams: {
        product: JSON.stringify(product)
      },
    });
  }
}
