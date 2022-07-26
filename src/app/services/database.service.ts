import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from '../interfaces/profile';
import { ProductItem, CartItem } from '../interfaces/store'
import { Store } from '@ngrx/store';
import { map } from 'rxjs';

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
    return this.afs.collection(FireStoreCollections.Store).doc(product.id).set({ reviews: product.reviews });
  }
  //fetch all blog
  fetchBlogPosts() {
    return this.afs.collection(FireStoreCollections.Blog).snapshotChanges();
  }
  //fetch user profile Tested
  fetchUserProfile(userID: string) {
    return this.afs.collection(FireStoreCollections.Users).doc(userID).snapshotChanges().pipe(
      map(snapshot => {
        return snapshot.payload.data();
      })).subscribe(userProfileData => {
        console.log(userProfileData);   // User Profile Data 
      });
  }
  //get token (login) tested
  login(email: string, password: string) {
    return new Promise((resolove, reject) => {
      this.fireAuth
        .signInWithEmailAndPassword(email, password)
        .then(userData => resolove(userData), err => reject(err));
    });
  }

  // current logged in user tested
  getCurrentUser() {
    this.fireAuth.authState.subscribe(user => {
      if (user) {
        // call user.id to get he UID
        // this.fetchUserProfile(user.uid); 

      } else {
        console.log('AUTHSTATE USER EMPTY', user);
      }
    },
      err => {
        console.log('Please try again')
      });
  }

  // logout Tested
  logout() {
    return new Promise((resolove, reject) => {
      this.fireAuth
        .signOut()
        .then(response => resolove(response), err => reject(err));
    });
  }

  // register tested
  register(user: User) {
    return new Promise((resolove, reject) => {
      this.fireAuth
        .createUserWithEmailAndPassword(user.email, user.password)
        .then(response => resolove(response), err => reject(err));
    });
  }
  // tested
  saveUserToFireStore(user: User) {
    return this.afs.collection(FireStoreCollections.Users).doc(user.id).set(user);
  }

  //fetch all wishlist
  fetchAllWishlistItems(userID: string) {
    return this.afs.collection(FireStoreCollections.Wishlist).doc(userID).snapshotChanges();
  }
  //modify (add to/delete from) wishlist
  modifyWishlist(userID: string) {
    let wishItems: Array<ProductItem> = [];
    this.store.select('wishList').subscribe(res => {
      wishItems = res;
    })
    return this.afs.collection(FireStoreCollections.Wishlist).doc(userID).set(wishItems);
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

enum FireStoreCollections {
  Users = '/Users',
  Store = '/Store',
  Blog = '/Blog',
  Wishlist = '/Wishlist',
  Cart = '/Cart'
}