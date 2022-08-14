import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { CartItem, ProductItem } from 'src/app/interfaces/store';
import { DatabaseService } from 'src/app/services/database.service';
import { removeFromWishList } from 'src/app/store/store/store-actions';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss'],
})
export class WishlistComponent implements OnInit {
  private _userID: string = ''; //Active user id stored in local storage
  storeObserve: Observable<{
    products: Array<ProductItem>;
    wishList: Array<ProductItem>;
    cart: Array<CartItem>;
  }> = new Observable(); //Obsevable to access store data

  constructor(
    private _router: Router,
    private _fireStore: DatabaseService,
    private _messageService: MessageService,
    private _store: Store<{
      store: {
        products: Array<ProductItem>;
        wishList: Array<ProductItem>;
        cart: Array<CartItem>;
      };
    }>
  ) {}

  //Fetch user id from local storage and subscribe to store
  ngOnInit(): void {
    this._userID = localStorage.getItem('userID')!;
    this.storeObserve = this._store.select('store');
  }
  //Navigates to selected product details
  goToDetails(id: string): void {
    this._router.navigate([`/store/details/${id}`]);
  }
  //Called when user click on remove from wishlist button, removes item from store and database
  removeFromWishlist(item: ProductItem): void {
    item = { ...item, wishList: false };
    this._store.dispatch(removeFromWishList({ payload: item }));
    this._fireStore
      .removeFromWishlist(this._userID, item.id)
      .then(() => {
        this.showSuccessToast('Item removed from wishlist');
      })
      .catch(() => {
        this.showErrorToast('Failed to remove item from wishlist');
      });
  }
  //Success toast message
  showSuccessToast(message: string): void {
    this._messageService.add({
      key: 'database',
      severity: 'success',
      detail: message,
    });
  }
  //Error toast message
  showErrorToast(message: string): void {
    this._messageService.add({
      key: 'database',
      severity: 'error',
      detail: message,
    });
  }
}
