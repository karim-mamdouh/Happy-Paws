import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AnimalType } from 'src/app/interfaces/adoption';
import {
  Brand,
  CartItem,
  ProductCategory,
  ProductItem,
} from 'src/app/interfaces/store';
import { addToWishList } from 'src/app/store/store/store-actions';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss'],
})
export class WishlistComponent implements OnInit {
  quantity: number = 0;
  Data: number = 0;
  wishlistItems: Observable<{
    cart: Array<CartItem>;
    products: Array<ProductItem>;
    wishList: Array<ProductItem>;
  }>;
  constructor(
    private _store: Store<{
      store: {
        cart: Array<CartItem>;
        products: Array<ProductItem>;
        wishList: Array<ProductItem>;
      };
    }>
  ) {
    this.wishlistItems = this._store.select('store');
  }

  ngOnInit(): void {
    this._store.dispatch(
      addToWishList({
        payload: {
          title: 'Dray Food',
          brand: Brand.Belcando,
          animalType: AnimalType.Bird,
          category: ProductCategory.Accessories,
          description: 'sdfgdgd',
          price: 430.5,
          rate: 100,
          wishList: false,
          id: '1000',
          images: [],
          reviews: [],
        },
      })
    );
    this.wishlistItems.subscribe((res) => {
      console.log(res);
    });
  }
}
