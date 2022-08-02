import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ProductItem, CartItem } from '../interfaces/store'
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private fireAuth: AngularFireAuth, private afs: AngularFirestore, private store: Store<{ cart: Array<CartItem>, wishList: Array<ProductItem>, products: Array<ProductItem> }>) { }
  //fetch all store items
  fetchAllStoreItems() {
    return this.afs.collection(FireStoreCollections.Store).snapshotChanges();
  }
  //add review to product item
  addReviewToProductItem(product: ProductItem) {
    return this.afs.collection(FireStoreCollections.Store).doc(product.id).update({ reviews: product.reviews });
  }
  //fetch all blog
  fetchBlogPosts() {
    return this.afs.collection(FireStoreCollections.Blog).snapshotChanges();
  }

  //fetch all wishlist
  fetchAllWishlistItems(userID: string) {
    return this.afs.collection(FireStoreCollections.Wishlist).doc(userID).snapshotChanges()
  }

  // add to wishlist 
  addToWishlist(userID: string, products: Array<ProductItem>) {
    const obj:any = {} as ProductItem;
    for (const key of products) {
      obj[key.id] = key;
    }
    return this.afs.collection(FireStoreCollections.Wishlist).doc(userID).update(obj)
  }

    // remove from wishlist 
    removeFromWishlist(userID: string, products: Array<ProductItem>) {
      const obj:any = {} as ProductItem;
      for (const key of products) {
        obj[key.id] = key;
      }
      return this.afs.collection(FireStoreCollections.Wishlist).doc(userID).set(obj)
    }

  //fetch user cart
  fetchUserCart(userID: string) {
    return this.afs.collection(FireStoreCollections.Cart).doc(userID).snapshotChanges();
  }
  //modify (add to/delete from) User Cart
  modifyCart(userID: string) {
    let cartItems: Array<CartItem> = [];
    this.store.select('cart').subscribe(res => {
      cartItems = res;
    })
    return this.afs.collection(FireStoreCollections.Cart).doc(userID).set(cartItems);
  }

  //order history
  //add address
  //fetch all animals


}

export enum FireStoreCollections {
  Users = '/Users',
  Store = '/Store',
  Blog = '/Blog',
  Wishlist = '/Wishlist',
  Cart = '/Cart'
}