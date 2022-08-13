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
  pageStartIndex: number = 0; //Start index for paginator
  numberOfItemsInPage: number = 9; //Number of pages in paginator
  pageCurrentStartIndex: number = 0; //Current start index for paginator
  pageCurrentEndIndex: number = 0; //Current end index for paginator
  filters: FilterData = {
    brand: [],
    category: [],
    animalType: [],
  }; //Active filters object
  subscriptions: Array<Subscription> = []; //Array holding all active subscription to be unsubscribed on destroy
  originalProducts: Array<ProductItem> = []; //Array holding store data
  filteredProducts: Array<ProductItem> = []; //Array holding filtered data
  paginatorChunk: Array<ProductItem> = []; //Array holding current viewed data by paginator

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

  //Subscribe to store and query params observables
  ngOnInit(): void {
    this.subscriptions.push(
      this._store.select('store').subscribe((respose) => {
        this.storeSubscription(respose);
      })
    );
    this.subscriptions.push(
      this._activeRoute.queryParams.subscribe((response) => {
        this.queryParamsSubscription(response);
      })
    );
  }
  //Unsubscribe from all observables on destroy
  ngOnDestroy(): void {
    this.subscriptions.forEach((element) => {
      element.unsubscribe();
    });
  }
  //Function for store subscription which refills the originalProducts array & holds the paginator in it's position
  // Also re-applies filters
  storeSubscription(response: any): void {
    this.originalProducts = response.products;
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
    this.onFilterOptionsChange(this.filters);
  }
  //Function for query params subscription which fills the selected filters in child and filters viewed data
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
  //Function called when add to cart button is clicked in child to add
  //product item to cart in store and update database
  addToCart(item: CartItem): void {
    this._store.dispatch(addToCart({ payload: item }));
  }
  //Function called when wishlist button is clicked in child to modify store
  //and update database
  alterWishlist(item: ProductItem): void {
    if (item.wishList) {
      this._store.dispatch(addToWishList({ payload: item }));
      //  this._fireStore.removeFromWishlist(localStorage.getItem('userID')!);
    } else {
      this._store.dispatch(removeFromWishList({ payload: item }));
    }
  }
  //Function called when filters are altered in child to apply new filters to filtered products array
  //If no filters applied filtered products array is filled with original products
  onFilterOptionsChange(filters: FilterData) {
    this.filters = filters;
    this.filteredProducts = this.originalProducts;
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
  }
  //Function called to show next data chunck in paginator
  paginate(start: number, end: number): void {
    this.pageCurrentStartIndex = start;
    this.pageCurrentEndIndex = end;
    this.paginatorChunk = this.filteredProducts.slice(start, end);
  }
}
