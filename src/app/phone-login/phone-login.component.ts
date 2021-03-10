import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

export class PhoneNumber {
  country: string;
  area: string;
  prefix: string;
  line: string;

  // format phone numbers as E.164
  get e164() {
    const num = '+' + this.country + this.area + this.prefix + this.line;
    console.log(num);
    return num;
  }

}

@Component({
  selector: 'app-phone-login',
  templateUrl: './phone-login.component.html',
  styleUrls: ['./phone-login.component.css']
})
export class PhoneLoginComponent implements OnInit {
  windowRef: any;
  phoneNumber = new PhoneNumber();
  verificationCode: string;
  user: any;
  invitedGuests = ['0614248765'];

  constructor(private win: AuthService, private router: Router) { }

  ngOnInit() {
    this.windowRef = this.win.windowRef;
    this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');

    this.windowRef.recaptchaVerifier.render();
  }

  sendLoginCode() {

    const appVerifier = this.windowRef.recaptchaVerifier;
    const num = this.phoneNumber.e164;

    console.log(num);

    firebase.auth().signInWithPhoneNumber(num, appVerifier)
            .then(result => {

                this.windowRef.confirmationResult = result;

            })
            .catch( error => console.log(error) );

  }

  verifyLoginCode() {
    this.windowRef.confirmationResult
                  .confirm(this.verificationCode)
                  .then( result => {
                    this.user = result.user;
    })
    .catch( error => console.log(error, 'Incorrect code entered?'));
  }

  verifyGuest() {
    const num = this.phoneNumber.area + this.phoneNumber.prefix + this.phoneNumber.line;
    console.log(num);
    if (this.invitedGuests.indexOf(num) > -1) {
      return true;
    } else {
      return false;
    }

  }


}
