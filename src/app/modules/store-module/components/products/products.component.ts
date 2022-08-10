import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { CartItem, ProductItem } from 'src/app/interfaces/store';
import { DatabaseService } from 'src/app/services/database.service';
import {
  addToCart,
  addToWishList,
  removeFromWishList,
} from 'src/app/store/store/store-actions';
import { FilterData } from '../filteration/filteration.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  pageStartIndex: number = 0;
  numberOfItemsInPage: number = 9;
  pageCurrentStartIndex: number = 0;
  pageCurrentEndIndex: number = 0;
  filteredProducts = [] as Array<ProductItem>;
  paginatorChunk = [] as Array<ProductItem>;

  constructor(
    private _store: Store<{
      store: {
        products: Array<ProductItem>;
        wishList: Array<ProductItem>;
        cart: Array<CartItem>;
      };
    }>,
    private _fireStore: DatabaseService,
    private _activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._store.select('store').subscribe((response) => {
      this.filteredProducts = response.products;
      if (window.innerWidth >= 992) {
        this.paginate(
          this.pageCurrentStartIndex,
          this.pageCurrentEndIndex === 0
            ? this.numberOfItemsInPage
            : this.pageCurrentEndIndex
        );
      } else {
        this.paginate(
          this.pageCurrentStartIndex,
          this.pageCurrentEndIndex === 0
            ? this.numberOfItemsInPage - 3
            : this.pageCurrentEndIndex
        );
      }
    });
  }
  addToCart(item: CartItem): void {
    this._store.dispatch(addToCart({ payload: item }));
  }
  alterWishlist(item: ProductItem): void {
    if (item.wishList) {
      this._store.dispatch(addToWishList({ payload: item }));
      //  this._fireStore.removeFromWishlist(localStorage.getItem('userID')!);
    } else {
      this._store.dispatch(removeFromWishList({ payload: item }));
    }
  }
  onFilterOptionsChange(filterOptions: FilterData) {}
  paginate(start: number, end: number): void {
    this.pageCurrentStartIndex = start;
    this.pageCurrentEndIndex = end;
    this.paginatorChunk = this.filteredProducts.slice(start, end);
  }
}
