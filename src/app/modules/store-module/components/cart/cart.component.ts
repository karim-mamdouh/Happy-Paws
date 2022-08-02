import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CartItem, ProductItem } from 'src/app/interfaces/store';
import { DatabaseService } from 'src/app/services/database.service';
import { resetCart } from 'src/app/store/store/store-actions';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cart: Array<CartItem> = [] as Array<CartItem>;
  totalCartPrice: number = 0;
  constructor(
    private _firestoreService: DatabaseService,
    private _router: Router,
    private _store: Store<{
      store: { cart: Array<CartItem>, products: Array<ProductItem>, wishList: Array<ProductItem> }
    }>) {
    this._store.select('store').subscribe(res => {
      let temp: Array<CartItem> = JSON.parse(JSON.stringify(res.cart));
      // If its the first time for the user to enter his cart
      // then filter out the default value in firebase document to prevent UI Errors
      // this check only works untill the user add/remove 1 item to the cart
      if (temp.some(e => e.id === '-999')) {
        let index = temp.findIndex(e => e.id === '-999');
        temp.splice(index, 1);
      }
      // display the cart after default value filtration
      this.cart = temp;
      this.calculateTotalPrice();
    });
  }
  calculateTotalPrice() {
    this.totalCartPrice = this.cart.reduce((accumulator, obj) => {
      let productValue = obj.price * obj.count;
      return accumulator + productValue;
    }, 0);
  }
  ngOnInit(): void { }

  decreaseQty(item: CartItem): void {
    if (item.count > 1) {
      item.count--;
      this._firestoreService.addToCart(localStorage.getItem('userID')!, this.cart).then(() => {
        this.calculateTotalPrice();
      });
    }
  }

  increaseQty(item: CartItem): void {
    item.count++;
    this._firestoreService.addToCart(localStorage.getItem('userID')!, this.cart).then(() => {
      this.calculateTotalPrice();
    });;
  }

  removeCartItem(item: CartItem): void {
    // Get index of the product inside cart
    const index = this.cart.findIndex(item => item.id === item.id);

    // remove from local cart list
    this.cart.splice(index, 1);

    // update firebase with the new cart state
    this._firestoreService.removeFromCart(localStorage.getItem('userID')!, this.cart).then(() => {
      this.calculateTotalPrice();
      // then clear the store
      this._store.dispatch(resetCart());
    })

  }

  onEmptyCartClick(): void {
    // Clear local cart
    this.cart = [];
    // update firebase with the new cart state
    this._firestoreService.removeFromCart(localStorage.getItem('userID')!, this.cart).then(() => {
      this.calculateTotalPrice();
      // then clear the store
      this._store.dispatch(resetCart());
    })
  }

  onShopNowClick(): void {
    this._router.navigate([`/store/products`]).then(() => {
      window.location.reload();
    });
  }
}
