import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireModule } from '@angular/fire/';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CardComponent } from './card/card.component';

const firebaseConfig = {
  apiKey: "AIzaSyDuL9UboGBvbG2fKc-NE2cr-4alpEsgd2A",
  authDomain: "angular-project-f2a48.firebaseapp.com",
  databaseURL: "https://angular-project-f2a48.firebaseio.com",
  projectId: "angular-project-f2a48",
  storageBucket: "angular-project-f2a48.appspot.com",
  messagingSenderId: "648112835211",
  appId: "1:648112835211:web:6463dafb3d21ba146c228e",
  measurementId: "G-DMEGE6EL4M"
};

@NgModule({
  declarations: [
    AppComponent,
    CardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
