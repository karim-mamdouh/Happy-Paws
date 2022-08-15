import { Injectable } from '@angular/core';
import { ProductItem, CartItem } from '../interfaces/store';
import { Animal } from '../interfaces/adoption';
import { Observable } from 'rxjs';
import {
  AngularFirestore,
  DocumentChangeAction,
} from '@angular/fire/compat/firestore';
import { deleteField } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  constructor(private _fireStore: AngularFirestore) {}

  //Generate ID from firebase
  generateID(): string {
    return this._fireStore.createId();
  }
  //Fetch all store items in database
  fetchAllStoreItems(): Observable<DocumentChangeAction<unknown>[]> {
    return this._fireStore
      .collection(FireStoreCollections.Store)
      .snapshotChanges();
  }
  //Fetch all blog posts in database
  fetchBlogPosts(): Observable<DocumentChangeAction<unknown>[]> {
    return this._fireStore
      .collection(FireStoreCollections.Blog)
      .snapshotChanges();
  }
  //Fetch all adoption animals
  fetchAllAnimals(): Observable<DocumentChangeAction<unknown>[]> {
    return this._fireStore
      .collection(FireStoreCollections.Pets)
      .snapshotChanges();
  }
  //Fetch all wishlist items for logged user
  fetchAllWishlistItems(userID: string): Observable<any> {
    return this._fireStore
      .collection(FireStoreCollections.Wishlist)
      .doc(userID)
      .snapshotChanges();
  }
  //Fetch cart items for logged user
  fetchUserCart(userID: string): Observable<any> {
    return this._fireStore
      .collection(FireStoreCollections.Cart)
      .doc(userID)
      .snapshotChanges();
  }
  //Checks wether the wishlist document for the current logged in user exists or no
  checkWishlistDocExist(userID: string): Observable<any> {
    return this._fireStore
      .collection(FireStoreCollections.Wishlist)
      .doc(userID)
      .get();
  }
  //Checks wether the cart document for the current logged in user exists or no
  checkCartDocExist(userID: string): Observable<any> {
    return this._fireStore
      .collection(FireStoreCollections.Cart)
      .doc(userID)
      .get();
  }
  //Adds item to wishlist doc of current logged in user
  addToWishlist(
    userID: string,
    product: ProductItem,
    docExist: boolean
  ): Promise<void> {
    if (docExist) {
      return this._fireStore
        .collection(FireStoreCollections.Wishlist)
        .doc(userID)
        .update({ [product.id]: product });
    } else {
      return this._fireStore
        .collection(FireStoreCollections.Wishlist)
        .doc(userID)
        .set({ [product.id]: product });
    }
  }
  //Removes item from wishlist doc of current logged in user
  removeFromWishlist(userID: string, productID: string): Promise<void> {
    return this._fireStore
      .collection(FireStoreCollections.Wishlist)
      .doc(userID)
      .update({ [productID]: deleteField() });
  }
  //Adds item to cart doc of current logged in user
  addToCart(
    userID: string,
    product: CartItem,
    docExist: boolean
  ): Promise<void> {
    if (docExist) {
      return this._fireStore
        .collection(FireStoreCollections.Cart)
        .doc(userID)
        .update({ [product.id]: product });
    } else {
      return this._fireStore
        .collection(FireStoreCollections.Cart)
        .doc(userID)
        .set({ [product.id]: product });
    }
  }
  //Removes item from wishlist doc of current logged in user
  removeFromCart(userID: string, productID: string): Promise<void> {
    return this._fireStore
      .collection(FireStoreCollections.Cart)
      .doc(userID)
      .update({ [productID]: deleteField() });
  }
  //Updates cart item in cart doc of current logged in user
  updateCartItem(userID: string, product: CartItem) {
    return this._fireStore
      .collection(FireStoreCollections.Cart)
      .doc(userID)
      .update({ [product.id]: product });
  }
  //Removes cart items document for logged in user
  emptyCart(userID: string): Promise<void> {
    return this._fireStore
      .collection(FireStoreCollections.Cart)
      .doc(userID)
      .delete();
  }
  //Adds animal to animal collection in database
  addAnimal(animal: Animal): Promise<void> {
    return this._fireStore
      .collection(FireStoreCollections.Pets)
      .doc(animal.id)
      .set(animal);
  }
  //Add review to product item
  addReviewToProductItem(product: ProductItem) {
    return this._fireStore
      .collection(FireStoreCollections.Store)
      .doc(product.id)
      .update({ reviews: product.reviews });
  }
}

export enum FireStoreCollections {
  Users = '/Users',
  Store = '/Store',
  Blog = '/Blog',
  Wishlist = '/Wishlist',
  Cart = '/Cart',
  Pets = '/Pets',
}
