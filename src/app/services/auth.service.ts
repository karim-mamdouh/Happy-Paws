import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../interfaces/profile';
import { FireStoreCollections } from './database.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private _fireAuth: AngularFireAuth,
    private _fireStore: AngularFirestore
  ) {}

  // Register new user to database
  register(email: string, password: string): Promise<any> {
    return this._fireAuth.createUserWithEmailAndPassword(email, password);
  }
  // Save user profile to database after registering
  saveUserToFireStore(user: User): Promise<void> {
    return this._fireStore
      .collection(FireStoreCollections.Users)
      .doc(user.id)
      .set(user);
  }
  //Deletes user from database collection
  removeUserFromFireStore(userID: string): Promise<void> {
    return this._fireStore
      .collection(FireStoreCollections.Users)
      .doc(userID)
      .delete();
  }
  //Gets current logged in user from database and delete this account
  removeUser(): Promise<void> {
    return this._fireAuth.currentUser.then((response) => response?.delete());
  }
  //Sends reset password email to input email
  changePassword(email: string): Promise<void> {
    return this._fireAuth.sendPasswordResetEmail(email);
  }
  // Fetch user profile from database based on user id
  fetchUserProfile(userID: string): Observable<unknown> {
    return this._fireStore
      .collection(FireStoreCollections.Users)
      .doc(userID)
      .snapshotChanges()
      .pipe(
        map((snapshot) => {
          return snapshot.payload.data();
        })
      );
  }
  // Login user to database
  login(email: string, password: string): Promise<any> {
    return this._fireAuth.signInWithEmailAndPassword(email, password);
  }
  // Logout user from database
  logout(): Promise<unknown> {
    return new Promise((resolove, reject) => {
      this._fireAuth.signOut().then(
        (response) => resolove(response),
        (err) => reject(err)
      );
    });
  }
}
