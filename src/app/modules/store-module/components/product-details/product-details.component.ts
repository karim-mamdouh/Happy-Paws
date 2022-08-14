import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import { MessageService } from 'primeng/api';
import { CartItem, ProductItem, Review } from 'src/app/interfaces/store';
import { DatabaseService } from 'src/app/services/database.service';
import {
  addReview,
  resetCart,
  resetWishList,
} from 'src/app/store/store/store-actions';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  cartlist: Array<CartItem> = [];
  product: ProductItem = {} as ProductItem;
  // Add review
  reviewRating: number = 3;
  comment?: string = '';
  // wishlist
  wishlist: Array<ProductItem> = [];
  productID: string = '';
  constructor(
    private _messageService: MessageService,
    private _router: ActivatedRoute,
    private _firestoreService: DatabaseService,
    private _store: Store<{
      store: {
        cart: Array<CartItem>;
        products: Array<ProductItem>;
        wishList: Array<ProductItem>;
      };
    }>
  ) {
    this._store.select('store').subscribe((res) => {
      this.wishlist = JSON.parse(JSON.stringify(res.wishList));
      this.cartlist = JSON.parse(JSON.stringify(res.cart));
    });
    this.productID = this._router.snapshot.paramMap.get('id')!;
  }
  ngOnInit(): void {
    this._store
      .select('store')
      .pipe(take(1))
      .subscribe((res) => {
        this.product = JSON.parse(
          JSON.stringify(
            res.products.find((e) => {
              return e.id === this.productID;
            })!
          )
        );
      });
  }
  onAddToWishlistClick(event: Event, product: ProductItem) {
    // if product already in wishlist
    // Remove the product
    if (product.wishList) {
      // Get index of the product inside wishlist
      const index = this.wishlist.findIndex((item) => item.id === product.id);
      this.product.wishList = false;
      // remove from local wishlist
      this.wishlist.splice(index, 1);

      // update firebase with the new wishlist state
      // this._firestoreService
      //   .removeFromWishlist(localStorage.getItem('userID')!, this.wishlist)
      //   .then((res) => {
      //     this._store.dispatch(resetWishList());
      //   });
    }
    // if product is not in wishlist
    else {
      this.product.wishList = true;
      // Add the product to local wishlist
      this.wishlist = [...this.wishlist, product];
      // update firebase with the new wishlist state
      // this._firestoreService
      //   .addToWishlist(localStorage.getItem('userID')!, this.wishlist)
      //   .then((res) => {
      //     this._store.dispatch(resetWishList());
      //   });
    }
  }
  addToCart(product: ProductItem) {
    let cartObj = JSON.parse(JSON.stringify(product)) as CartItem;
    cartObj.count = 1;
    this.cartlist = [...this.cartlist, cartObj];
    // this._firestoreService
    //   .addToCart(localStorage.getItem('userID')!, this.cartlist)
    //   .then(() => {
    //     this._store.dispatch(resetCart());
    //   });
  }
  reset() {
    this.reviewRating = 3;
    this.comment = '';
  }
  onSubmitReviewClick(event: Event) {
    if (localStorage.getItem('userID') != null) {
      // Create a new Review object
      let reviewObject: Review = {} as Review;
      reviewObject.rate = this.reviewRating;
      reviewObject.userID = localStorage.getItem('userID')!;
      reviewObject.userName = localStorage.getItem('userName')!;
      reviewObject.comment = this.comment;

      // Add Review to local product object
      this.product.reviews.push(reviewObject);

      // update the product reviews in the database
      this._firestoreService
        .addReviewToProductItem(this.product)
        .then(() => {
          // update the product reviews in ngrx store
          this._store.dispatch(
            addReview({ payload: { id: this.productID, review: reviewObject } })
          );
          this.showSuccessToast('Review Successfually added');
          this.reset();
        })
        .catch((err) => {
          this.showErrorToast(
            `Error adding your review, Please contact the support ${err}`
          );
        });
    } else {
      this.showErrorToast('Please Login first !');
    }
  }
  //Function that shows success toaster
  showSuccessToast(successMsg: string): void {
    this._messageService.add({
      key: 'Successtoast',
      severity: 'success',
      summary: '',
      detail: successMsg,
    });
  }
  //Function that shows error toaster
  showErrorToast(errorMsg: string): void {
    this._messageService.add({
      key: 'Errortoast',
      severity: 'error',
      summary: '',
      detail: errorMsg,
    });
  }
}
