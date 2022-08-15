import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { elementAt, map, take } from 'rxjs/operators';
import { DatabaseService } from 'src/app/services/database.service';
import { Store } from '@ngrx/store';
import { CartItem, ProductItem } from 'src/app/interfaces/store';
import {
  fillCartList,
  fillProducts,
  fillWishList,
  resetCart,
  resetProducts,
  resetWishList,
} from 'src/app/store/store/store-actions';
import { fillBlog } from './store/blog/blog-actions';
import { Article } from './interfaces/blog';
import { fillAdoption } from './store/adoption/adoption-actions';
import { Animal } from './interfaces/adoption';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  private _subscription: Array<Subscription> = []; //Array of active subscriptions
  title = 'Happy Paws'; //App title
  showNavbarFooter: boolean = false; //Flag for showing navbar and footer

  constructor(
    private _router: Router,
    private _primengConfig: PrimeNGConfig,
    private _firestoreService: DatabaseService,
    private _store: Store<{
      store: {
        products: Array<ProductItem>;
        wishList: Array<ProductItem>;
        cart: Array<CartItem>;
      };
    }>
  ) {}

  //Fetch all data from firebase and fill store
  ngOnInit(): void {
    this._primengConfig.ripple = true;
    this.activeRoute();
    this.fetchAllAnimals();
    this.fetchAllBlogArticles();
    this.fetchAllProducts();
    // If User is logged in
    if (localStorage.getItem('userID')) {
      this.fetchAllCartItems();
      this.fetchAllWishlist();
    }
  }
  //Unsubscribe from all connections
  ngOnDestroy(): void {
    this._subscription.forEach((element) => {
      element.unsubscribe();
    });
  }
  //Only shows navbar and footer in all pages except login and register
  activeRoute(): void {
    this._subscription.push(
      this._router.events.subscribe((event: any) => {
        if (event.url !== undefined && event.type === 1) {
          if (event.url.includes('login') || event.url.includes('register'))
            this.showNavbarFooter = false;
          else this.showNavbarFooter = true;
        }
      })
    );
  }
  //Fetch all animals and fill store
  fetchAllAnimals(): void {
    this._subscription.push(
      this._firestoreService
        .fetchAllAnimals()
        .pipe(map((changes) => changes.map((c) => c.payload.doc.data())))
        .subscribe((response) => {
          this._store.dispatch(
            fillAdoption({ payload: response as Array<Animal> })
          );
        })
    );
  }
  // Fetch all products and fill store
  fetchAllProducts(): void {
    this._subscription.push(
      this._firestoreService
        .fetchAllStoreItems()
        .pipe(map((changes) => changes.map((c) => c.payload.doc.data())))
        .subscribe((response) => {
          this._store.dispatch(
            fillProducts({ payload: response as Array<ProductItem> })
          );
        })
    );
  }
  //Fetch all blog items and fill store
  fetchAllBlogArticles(): void {
    this._subscription.push(
      this._firestoreService
        .fetchBlogPosts()
        .pipe(map((changes) => changes.map((c) => c.payload.doc.data())))
        .subscribe((response) => {
          this._store.dispatch(
            fillBlog({ payload: response as Array<Article> })
          );
        })
    );
  }
  // Get Cartlist from firebase and save inside the store
  fetchAllCartItems(): void {
    this._subscription.push(
      this._firestoreService
        .fetchUserCart(localStorage.getItem('userID')!)
        .pipe(
          map((snapshot) => {
            return snapshot.payload.data();
          })
        )
        .subscribe((response) => {
          if (response) {
            this._store.dispatch(resetCart());
            let temp = response as Array<CartItem>;
            let tempToArray: Array<CartItem> = Object.values(temp);
            this._store.dispatch(fillCartList({ payload: tempToArray }));
          }
        })
    );
  }
  fetchAllWishlist(): void {
    // Get Wishlist from firebase and save inside the store
    this._subscription.push(
      this._firestoreService
        .fetchAllWishlistItems(localStorage.getItem('userID')!)
        .pipe(
          map((snapshot) => {
            return snapshot.payload.data();
          })
        )
        .subscribe((response) => {
          this._store.dispatch(resetWishList());
          let temp = response as Array<ProductItem>;
          let tempToArray: Array<ProductItem> = Object.values(temp);
          this._store.dispatch(fillWishList({ payload: tempToArray }));
        })
    );
  }
}
