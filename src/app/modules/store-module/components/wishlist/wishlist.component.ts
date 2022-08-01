import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CartItem, ProductItem } from 'src/app/interfaces/store';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss'],
})
export class WishlistComponent implements OnInit {
  wishlist: Array<ProductItem> = [];

  constructor(
    private _router: Router,
    private _store: Store<{
      store: { cart: Array<CartItem>, products: Array<ProductItem>, wishList: Array<ProductItem> }
    }>) {

    this._store.select('store').subscribe(res => {
      this.wishlist = res.wishList;
    });
  }

  ngOnInit(): void {
  }

  onDetailsClick(product: ProductItem): void {
    this._router.navigate([`/store/details`], {
      queryParams: {
        product: JSON.stringify(product)
      },
    });
  }
  onRemoveItemClick(product: ProductItem): void {
    console.log("onRemoveItemClick Clicked");
  }

}
