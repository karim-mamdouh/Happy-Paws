import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { User } from '../interfaces/profile';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireAuth: AngularFireAuth, private afs: AngularFirestore) { }

  // register 
  register(user: User) {
    return new Promise((resolove, reject) => {
      this.fireAuth
        .createUserWithEmailAndPassword(user.email, user.password)
        .then(response => resolove(response), err => reject(err));
    });
  }
  // login
  login(email: string, password: string) {
    return new Promise((resolove, reject) => {
      this.fireAuth
        .signInWithEmailAndPassword(email, password)
        .then(userData => resolove(userData), err => reject(err));
    });
  }

  // logout 
  logout() {
    return new Promise((resolove, reject) => {
      this.fireAuth
        .signOut()
        .then(response => resolove(response), err => reject(err));
    });
  }


  // current logged in user 
  getCurrentUser() {
    this.fireAuth.authState.subscribe(user => {
      if (user) {
        // User = the current logged in user
        // call user.id to get he UID
        // this.fetchUserProfile(user.uid); 

      } else {
        // No user is logged in 
        console.log('AUTHSTATE USER EMPTY', user);
      }
    },
      err => {
        console.log('Please try again')
      });
  }

  // Save user profile to database after registering
  saveUserToFireStore(user: User) {
    return this.afs.collection(FireStoreCollections.Users).doc(user.id).set(user);
  }

  //fetch user profile from database
  fetchUserProfile(userID: string) {
    return this.afs.collection(FireStoreCollections.Users).doc(userID).snapshotChanges().pipe(
      map(snapshot => {
        return snapshot.payload.data();
      })).subscribe(userProfileData => {
        console.log(userProfileData);   // User Profile Data 
      });
  }

}

enum FireStoreCollections {
  Users = '/Users',
  Store = '/Store',
  Blog = '/Blog',
  Wishlist = '/Wishlist',
  Cart = '/Cart'
}