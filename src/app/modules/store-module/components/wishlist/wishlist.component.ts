import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CartItem, ProductItem } from 'src/app/interfaces/store';
import { DatabaseService } from 'src/app/services/database.service';
import { resetWishList } from 'src/app/store/store/store-actions';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss'],
})
export class WishlistComponent implements OnInit {
  wishlist: Array<ProductItem> = [];

  constructor(
    private _router: Router,
    private _firestoreService: DatabaseService,
    private _store: Store<{
      store: { cart: Array<CartItem>, products: Array<ProductItem>, wishList: Array<ProductItem> }
    }>) {
    this._store.select('store').subscribe(res => {
      let temp: Array<ProductItem> = JSON.parse(JSON.stringify(res.wishList));
      // If its the first time for the user to enter his wishlist
      // then filter out the default value in firebase document to prevent UI Errors
      // this check only works untill the user add/remove 1 item to the wishlist
      if (temp.some(e => e.id === '-999')) {
        let index = temp.findIndex(e => e.id === '-999');
        temp.splice(index, 1);
      }
      // display the wishlist after default value filtration
      this.wishlist = temp;
    });
  }

  ngOnInit(): void {

  }

  onDetailsClick(productID: string): void {
    this._router.navigate([`/store/details/${productID}`]);
  }
  onRemoveItemClick(product: ProductItem): void {
    // Get index of the product inside wishlist
    const index = this.wishlist.findIndex(item => item.id === product.id);

    // remove from local wishlist
    this.wishlist.splice(index, 1);

    // update firebase with the new wishlist state
    this._firestoreService.removeFromWishlist(localStorage.getItem('userID')!, this.wishlist).then(res => {
      this._store.dispatch(resetWishList());
    })

  }

}
