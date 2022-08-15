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
import { Paginator } from 'primeng/paginator';
import { MessageService } from 'primeng/api';
import { SmallFilterComponent } from '../small-filter/small-filter.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  private _userID: string = ''; //Active user id stored in local storage
  private _pageCurrentStartIndex: number = 0; //Current start index for paginator
  private _pageCurrentEndIndex: number = 0; //Current end index for paginator
  private _subscriptions: Array<Subscription> = []; //Array holding all active subscription to be unsubscribed on destroy
  private _originalProducts: Array<ProductItem> = []; //Array holding store data
  @ViewChild(FilterationComponent) private _filterComponent =
    {} as FilterationComponent; //Filteration component object to fill active filters on query params change
  @ViewChild(SmallFilterComponent) private _smallFilterComponent =
    {} as SmallFilterComponent; //Small screen filteration component object to fill active filters on query params change

  @ViewChild('paginator') paginator = {} as Paginator; //Paginator object to be used to navigate to page 1 on filter change
  pageStartIndex: number = 0; //Start index for paginator
  numberOfItemsInPage: number = 9; //Number of pages in paginator
  filters: FilterData = {
    brand: [],
    category: [],
    animalType: [],
  }; //Active filters object
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
    private _activeRoute: ActivatedRoute,
    private _messageService: MessageService
  ) {}

  //Subscribe to store and query params observables
  ngOnInit(): void {
    this._userID = localStorage.getItem('userID')!;
    this._subscriptions.push(
      this._store.select('store').subscribe((respose) => {
        this.storeSubscription(respose);
      })
    );
    this._subscriptions.push(
      this._activeRoute.queryParams.subscribe((response) => {
        this.queryParamsSubscription(response);
      })
    );
  }
  //Unsubscribe from all observables on destroy
  ngOnDestroy(): void {
    this._subscriptions.forEach((element) => {
      element.unsubscribe();
    });
  }
  //Function for store subscription which refills the _originalProducts array & holds the paginator in it's position
  // Also re-applies filters
  storeSubscription(response: any): void {
    this._originalProducts = JSON.parse(JSON.stringify(response.products)).map(
      (product: any) => {
        if (
          response.wishList.findIndex(
            (wishlist: any) => wishlist.id === product.id
          ) !== -1
        ) {
          product.wishList = true;
        }
        return product;
      }
    );

    this.onFilterOptionsChange(this.filters);
    this.paginate(
      this._pageCurrentStartIndex,
      this._pageCurrentEndIndex === 0
        ? this.numberOfItemsInPage
        : this._pageCurrentEndIndex
    );
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
    this._filterComponent.activeFilters = this.filters;
    this._smallFilterComponent.activeFilters = this.filters;
    this.onFilterOptionsChange(this.filters);
    this.paginate(
      this._pageCurrentStartIndex,
      this._pageCurrentEndIndex === 0
        ? this.numberOfItemsInPage
        : this._pageCurrentEndIndex
    );
  }
  //Function called when add to cart button is clicked in child to add
  //product item to cart in store and update database
  addToCart(item: CartItem): void {
    this._subscriptions.push(
      this._fireStore.checkCartDocExist(this._userID).subscribe(
        (response) => {
          this._fireStore
            .addToCart(this._userID, item, response.exists)
            .then(() => {
              this._store.dispatch(addToCart({ payload: item }));
              this.showSuccessToast('Item added to cart');
            })
            .catch(() => {
              this.showErrorToast('Failed to add item to cart');
            });
        },
        () => {
          this.showErrorToast('Failed to add item to cart');
        }
      )
    );
  }
  //Function called when wishlist button is clicked in child to modify store
  //and update database
  alterWishlist(item: ProductItem): void {
    if (item.wishList) {
      this._subscriptions.push(
        this._fireStore.checkWishlistDocExist(this._userID).subscribe(
          (response) => {
            this._fireStore
              .addToWishlist(this._userID, item, response.exists)
              .then(() => {
                this._store.dispatch(addToWishList({ payload: item }));
                this.showSuccessToast('Item added to wishlist');
              })
              .catch(() => {
                this.showErrorToast('Failed to add item to wishlist');
              });
          },
          () => {
            this.showErrorToast('Failed to add item to wishlist');
          }
        )
      );
    } else {
      this._fireStore
        .removeFromWishlist(this._userID, item.id)
        .then(() => {
          this._store.dispatch(removeFromWishList({ payload: item }));
          this.showSuccessToast('Item removed from wishlist');
        })
        .catch(() => {
          this.showErrorToast('Failed to remove item from wishlist');
        });
    }
  }
  //Function called when filters are altered in child to apply new filters to filtered products array
  //If no filters applied filtered products array is filled with original products
  onFilterOptionsChange(filters: FilterData) {
    this.filters = filters;
    this.filteredProducts = this._originalProducts;
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
    this._pageCurrentStartIndex = start;
    this._pageCurrentEndIndex = end;
    this.paginatorChunk = this.filteredProducts.slice(start, end);
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
