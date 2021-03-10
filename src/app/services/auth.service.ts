import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, of }  from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { User } from './auth.interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User>;

  constructor(
    private fireAuth: AngularFireAuth,
    private fireStore: AngularFirestore,
    private router: Router
  ) {
    // Get an observable of type User, through the valueChanges function
    this.user$ = this.fireAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.fireStore.doc<User>('users/${user.uid}').valueChanges();
        } else {
          // of(null) can be used to know when the user is not logged in
          return of(null);
        }
      })
    );
  }

  async googleSignin() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.fireAuth.auth.signInWithPopup(provider);
    return this.updateUserData(credential.user);
  }

  async signOut() {
    await this.fireAuth.auth.signOut();
    return this.router.navigate(['/']);
  }

  private updateUserData(user) {
      // Sets user data to firestore on login
      const userRef: AngularFirestoreDocument<User> = this.fireStore.doc('users/${user.uid}');

      const data = {
        uid: user.uid,
        email: user.email,
        photoURL: user.photoURL,
        displayName: user.displayName
      };

      // Set is destructive and will destroy all the data if merge is not set to true
      return userRef.set(data, { merge: true });
    }


  get windowRef() {
    return window;
  }
}
