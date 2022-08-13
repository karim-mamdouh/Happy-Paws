import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AnimalType } from 'src/app/interfaces/adoption';
import {
  Brand,
  CartItem,
  ProductCategory,
  ProductItem,
} from 'src/app/interfaces/store';
import { DatabaseService } from 'src/app/services/database.service';
import {
  addToCart,
  addToWishList,
  removeFromWishList,
} from 'src/app/store/store/store-actions';
import {
  FilterationComponent,
  FilterData,
} from '../filteration/filteration.component';

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
  filters: Array<string> = [];
  subscriptions: Array<Subscription> = [];
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
    Object.values(this._activeRoute.snapshot.queryParams).forEach((element) => {
      this.filters.push(element);
    });

    this.subscriptions.push(
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
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((element) => {
      element.unsubscribe();
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

  onFilterOptionsChange(
    filterOptions: Array<AnimalType | Brand | ProductCategory>
  ) {
    this.subscriptions.push(
      this._store.select('store').subscribe((response) => {
        this.filteredProducts = response.products;
      })
    );
    if (filterOptions.length !== 0) {
      let newProducts: Array<ProductItem> = [];
      for (let i = 0; i < filterOptions.length; i++) {
        for (let j = 0; j < this.filteredProducts.length; j++) {
          if (
            newProducts.filter(
              (element) => element.id === this.filteredProducts[j].id
            ).length === 0
          ) {
            if (this.filteredProducts[j].animalType === filterOptions[i]) {
              newProducts.push(this.filteredProducts[j]);
            }
            if (this.filteredProducts[j].category === filterOptions[i]) {
              newProducts.push(this.filteredProducts[j]);
            }
            if (this.filteredProducts[j].brand === filterOptions[i]) {
              newProducts.push(this.filteredProducts[j]);
            }
          }
        }
      }
      console.log(newProducts);
      this.filteredProducts = newProducts;
    }
    this.paginate(0, this.numberOfItemsInPage);
  }

  paginate(start: number, end: number): void {
    this.pageCurrentStartIndex = start;
    this.pageCurrentEndIndex = end;
    this.paginatorChunk = this.filteredProducts.slice(start, end);
  }
}
