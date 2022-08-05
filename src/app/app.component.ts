import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { map, take, throwIfEmpty } from 'rxjs/operators';
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
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Happy Paws';
  showNavbarFooter: boolean = false;
  constructor(
    private _router: Router,
    private primengConfig: PrimeNGConfig,
    private _firestoreService: DatabaseService,
    private _store: Store<{
      store: {
        products: Array<ProductItem>;
        wishList: Array<ProductItem>;
        cart: Array<CartItem>;
      };
    }>
  ) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    //Only shows navbar and footer in all pages except login and register
    this._router.events.subscribe((event: any) => {
      if (event.url !== undefined && event.type === 1) {
        if (event.url.includes('login') || event.url.includes('register'))
          this.showNavbarFooter = false;
        else this.showNavbarFooter = true;
      }
    });

    //Fetch all animals and fill store
    this._firestoreService
      .fetchAllAnimals()
      .pipe(map((changes) => changes.map((c) => c.payload.doc.data())))
      .subscribe((res) => {
        this._store.dispatch(fillAdoption({ payload: res as Array<Animal> }));
      });
    // get Products from firebase and save inside the store and cache it locally
    if (sessionStorage.getItem('product') == null) {
      this._firestoreService
        .fetchAllStoreItems()
        .pipe(map((changes) => changes.map((c) => c.payload.doc.data())))
        .subscribe((res) => {
          let temp = res as Array<ProductItem>;
          console.log('From Firebase', temp);
          sessionStorage.setItem('product', JSON.stringify(temp));
          this._store.dispatch(fillProducts({ payload: temp }));
        });
    } else {
      let temp = JSON.parse(sessionStorage.getItem('product')!);
      console.log('From Cache', temp);
      this._store.dispatch(fillProducts({ payload: temp }));
    }
    //Fetch all blog items and fill store
    this._firestoreService
      .fetchBlogPosts()
      .pipe(map((changes) => changes.map((c) => c.payload.doc.data())))
      .subscribe((res) => {
        this._store.dispatch(fillBlog({ payload: res as Array<Article> }));
      });
    // If User is logged in
    if (localStorage.getItem('userID')) {
      // get Wishlist from firebase and save inside the store
      this._firestoreService
        .fetchAllWishlistItems(localStorage.getItem('userID')!)
        .pipe(
          map((snapshot) => {
            return snapshot.payload.data();
          })
        )
        .subscribe((res) => {
          this._store.dispatch(resetWishList());
          let temp = res as Array<ProductItem>;
          let tempToArray: Array<ProductItem> = Object.values(temp);
          this._store.dispatch(fillWishList({ payload: tempToArray }));
        });

      // Change the local products wishlist status based on user`s wishlist
      this._store
        .select('store')
        .pipe(take(3))
        .subscribe((res) => {
          if (res.wishList.length > 0) {
            // Creating Deep Copies of products,wishlist to be able to modify properties
            let tempProducts: Array<ProductItem> = JSON.parse(
              JSON.stringify(res.products)
            );
            let tempWishList: Array<ProductItem> = JSON.parse(
              JSON.stringify(res.wishList)
            );
            // looping to change the wishlist status inside products
            for (let i: number = 0; i < tempProducts.length; i++) {
              for (let j: number = 0; j < tempWishList.length; j++) {
                if (tempProducts[i].id == tempWishList[j].id) {
                  tempProducts[i].wishList = true;
                }
              }
            }
            // saving the new state in ngrx store
            this._store.dispatch(resetProducts());
            this._store.dispatch(fillProducts({ payload: tempProducts }));
          }
        });

      // get Cartlist from firebase and save inside the store
      this._firestoreService
        .fetchUserCart(localStorage.getItem('userID')!)
        .pipe(
          map((snapshot) => {
            return snapshot.payload.data();
          })
        )
        .subscribe((res) => {
          this._store.dispatch(resetCart());
          let temp = res as Array<CartItem>;
          let tempToArray: Array<CartItem> = Object.values(temp);
          this._store.dispatch(fillCartList({ payload: tempToArray }));
        });
    }
  }
}
