import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { map } from 'rxjs/operators';
import { DatabaseService } from 'src/app/services/database.service';
import { Store } from '@ngrx/store';
import { CartItem, ProductItem } from 'src/app/interfaces/store';
import { fillProducts, fillWishList, resetWishList } from 'src/app/store/store/store-actions';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Happy Paws';
  activeURL: string = '';

  constructor(
    private _router: Router,
    private primengConfig: PrimeNGConfig,
    private _firestoreService: DatabaseService,
    private _store: Store<{ store: { products: Array<ProductItem>, wishList: Array<ProductItem>, cart: Array<CartItem> } }>
  ) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this._router.events.subscribe((event: any) => {
      if (event.url !== undefined && event.type === 1)
        this.activeURL = event.url;
    });

    // get Wishlist from firebase and save inside the store
    this._firestoreService.fetchAllWishlistItems(localStorage.getItem('userID')!).pipe(
      map((snapshot) => {
        return snapshot.payload.data();
      })
    ).subscribe(res => {
      this._store.dispatch(resetWishList());
      let temp = res as Array<ProductItem>;
      let tempToArray: Array<ProductItem> = Object.values(temp);
      this._store.dispatch(fillWishList({ payload: tempToArray }))
    })

    if (sessionStorage.getItem('product') == null) {
      this._firestoreService.fetchAllStoreItems().pipe(
        map(changes =>
          changes.map(c => (c.payload.doc.data()))

        )
      ).subscribe((res) => {
        let temp = res as Array<ProductItem>;
        console.log("From Firebase", temp);
        sessionStorage.setItem('product', JSON.stringify(temp));
        this._store.dispatch(fillProducts({ payload: temp }));
      });
    }
    else {
      let temp = JSON.parse(sessionStorage.getItem('product')!);
      console.log("From Cache", temp);
      this._store.dispatch(fillProducts({ payload: temp }));
    }
  }
}
