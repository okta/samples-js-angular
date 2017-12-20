import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';

interface Claim {
  claim: String,
  value: String
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  idToken;
  claims: Array<Claim>

  constructor(public oktaAuth: OktaAuthService) {
    this.idToken = this.oktaAuth.getIdToken();
    this.claims = Object.entries(this.idToken.claims).map(entry => ({ claim: entry[0], value: entry[1] }));
  }

  ngOnInit() {
  }

}
