import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { User } from '../interfaces/profile';
import { ProductItem } from '../interfaces/store';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private _fireAuth: AngularFireAuth,
    private _fireStore: AngularFirestore
  ) {}

  // Register new user to database
  register(user: User) {
    return this._fireAuth.createUserWithEmailAndPassword(
      user.email,
      user.password
    );
  }
  // Save user profile to database after registering
  saveUserToFireStore(user: User) {
    return this._fireStore
      .collection(FireStoreCollections.Users)
      .doc(user.id)
      .set(user);
  }
  createUserWishlist(userID: string){
    let initialState:ProductItem = {} as ProductItem
    initialState.id= '-999';
    let obj = {[-999]:initialState}
    return this._fireStore
    .collection(FireStoreCollections.Wishlist)
    .doc(userID)
    .set(obj)
  }
  createUserCart(userID: string){
    let initialState:ProductItem = {} as ProductItem
    initialState.id= '-999';
    let obj = {[-999]:initialState}
    return this._fireStore
    .collection(FireStoreCollections.Cart)
    .doc(userID)
    .set(obj)
  }
  // Fetch user profile from database based on user id
  fetchUserProfile(userID: string) {
    return this._fireStore
      .collection(FireStoreCollections.Users)
      .doc(userID)
      .snapshotChanges()
      .pipe(
        map((snapshot) => {
          return snapshot.payload.data();
        })
      )
      .subscribe((userProfileData) => {
        console.log(userProfileData); // User Profile Data
      });
  }
  // Login user to database
  login(email: string, password: string) {
    return this._fireAuth.signInWithEmailAndPassword(email, password);
  }
  // Logout user from database
  logout() {
    return new Promise((resolove, reject) => {
      this._fireAuth.signOut().then(
        (response) => resolove(response),
        (err) => reject(err)
      );
    });
  }

  // // current logged in user
  // getCurrentUser() {
  //   this._fireAuth.authState.subscribe(
  //     (user) => {
  //       if (user) {
  //         // User = the current logged in user
  //         // call user.id to get he UID
  //         // this.fetchUserProfile(user.uid);
  //       } else {
  //         // No user is logged in
  //         console.log('AUTHSTATE USER EMPTY', user);
  //       }
  //     },
  //     (err) => {
  //       console.log('Please try again');
  //     }
  //   );
  // }
}

enum FireStoreCollections {
  Users = '/Users',
  Store = '/Store',
  Blog = '/Blog',
  Wishlist = '/Wishlist',
  Cart = '/Cart',
}
