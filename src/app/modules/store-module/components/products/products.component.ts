import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { CartItem, FilterData, ProductItem } from 'src/app/interfaces/store';
import {
  addToCart,
  addToWishList,
  removeFromWishList,
} from 'src/app/store/store/store-actions';
import { DatabaseService } from 'src/app/services/database.service';
import { FilterationComponent } from '../filteration/filteration.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  @ViewChild(FilterationComponent) filterComponent = {} as FilterationComponent;
  pageStartIndex: number = 0;
  numberOfItemsInPage: number = 9;
  pageCurrentStartIndex: number = 0;
  pageCurrentEndIndex: number = 0;
  filters: FilterData = {
    brand: [],
    category: [],
    animalType: [],
  };
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
    this.subscriptions.push(
      this._activeRoute.queryParams.subscribe((response) => {
        this.queryParamsSubscription(response);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((element) => {
      element.unsubscribe();
    });
  }
  storeSubscription(response: any): void {
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
  }
  queryParamsSubscription(response: any): void {
    this.filters.animalType = [];
    this.filters.category = [];
    if (response['animalType'] !== undefined) {
      this.filters.animalType.push(response['animalType']);
    }
    if (response['category'] !== undefined) {
      this.filters.category.push(response['category']);
    }
    this.filterComponent.activeFilters = this.filters;
    this.onFilterOptionsChange(this.filters);
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

  onFilterOptionsChange(filters: FilterData) {
    this.filters = filters;
    this.subscriptions.push(
      this._store.select('store').subscribe((response) => {
        this.storeSubscription(response);
      })
    );
    if (
      filters.animalType.length !== 0 ||
      filters.brand.length !== 0 ||
      filters.category.length !== 0
    ) {
      let newFiltered: Array<ProductItem> = [];
      this.filteredProducts.forEach((element) => {
        if (
          (filters.animalType.length !== 0
            ? filters.animalType.includes(element.animalType)
            : true) &&
          (filters.brand.length !== 0
            ? filters.brand.includes(element.brand)
            : true) &&
          (filters.category.length !== 0
            ? filters.category.includes(element.category)
            : true)
        ) {
          newFiltered.push(element);
        }
      });
      this.filteredProducts = newFiltered;
    }
    this.paginate(0, this.numberOfItemsInPage);
  }

  paginate(start: number, end: number): void {
    this.pageCurrentStartIndex = start;
    this.pageCurrentEndIndex = end;
    this.paginatorChunk = this.filteredProducts.slice(start, end);
  }
}
