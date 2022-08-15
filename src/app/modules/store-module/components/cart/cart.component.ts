import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { CartItem, ProductItem } from 'src/app/interfaces/store';
import { DatabaseService } from 'src/app/services/database.service';
import {
  removeFromCart,
  resetCart,
  updateCartItem,
} from 'src/app/store/store/store-actions';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  private _userID: string = ''; //Active user id stored in local storage
  cartItems: Array<CartItem> = []; //Cart items array
  totalCartPrice: number = 0; // Total cost of cart items

  constructor(
    private _fireStore: DatabaseService,
    private _messageService: MessageService,
    private _router: Router,
    private _store: Store<{
      store: {
        cart: Array<CartItem>;
        products: Array<ProductItem>;
        wishList: Array<ProductItem>;
      };
    }>
  ) {}

  //Subscribe to store and fetch user id
  ngOnInit(): void {
    this._userID = localStorage.getItem('userID')!;
    this._store.select('store').subscribe((response) => {
      this.cartItems = response.cart;
      this.calculateTotalPrice();
    });
  }
  //Function that calculate all cart items price
  calculateTotalPrice(): void {
    this.totalCartPrice = this.cartItems.reduce((accumulator, obj) => {
      let productValue = obj.price * obj.count;
      return accumulator + productValue;
    }, 0);
  }
  //Function called when user decrement cart item quantity, updates database and store
  decreaseQty(item: CartItem): void {
    if (item.count > 1) {
      item = { ...item, count: item.count - 1 };
      this._fireStore
        .updateCartItem(this._userID, item)
        .then(() => {
          this._store.dispatch(updateCartItem({ payload: item }));
          this.calculateTotalPrice();
        })
        .catch(() => {
          this.showErrorToast('Failed to decrement');
        });
    }
  }
  //Function called when user increment cart item quantity, updates database and store
  increaseQty(item: CartItem): void {
    item = { ...item, count: item.count + 1 };
    this._fireStore
      .updateCartItem(this._userID, item)
      .then(() => {
        this._store.dispatch(updateCartItem({ payload: item }));
        this.calculateTotalPrice();
      })
      .catch(() => {
        this.showErrorToast('Failed to increment');
      });
  }
  //Function called when user removes cart item, updates database and store
  removeCartItem(id: string): void {
    this._fireStore
      .removeFromCart(this._userID, id)
      .then(() => {
        this._store.dispatch(removeFromCart({ payload: { id: id } }));
        this.calculateTotalPrice();
      })
      .catch(() => {
        this.showErrorToast('Failed to remove item');
      });
  }
  //Function called when user empty cart items, updates database and store
  emptyCart(): void {
    this._store.dispatch(resetCart());
    this._fireStore
      .emptyCart(this._userID)
      .then(() => {
        this.showSuccessToast('Cart empty success');
      })
      .catch(() => {
        this.showErrorToast('Failed to empty cart');
      });
  }
  //Navigates back to products screen
  onShopNowClick(): void {
    this._router.navigate([`/store/products`]);
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
