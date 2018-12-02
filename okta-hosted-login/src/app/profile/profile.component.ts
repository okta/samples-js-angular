/*!
 * Copyright (c) 2018, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
import { PayrollService } from '../payroll.service';

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
  claims: Array<Claim>;
  relevantClaims: Array<Claim> = [];
  stringIsEmpty: boolean = true;
  randomGeneratedID: string;
  userClaims: any;

  constructor(public oktaAuth: OktaAuthService) {

  }

  checkQueryString(input: string){
      if( input !== '' ){
          this.stringIsEmpty = false;
      }
    }

  updateName(input: string){
    this.userClaims.name = input;
    //when user hit's "update" button, find the entry in the employee DB w/ the same employeeID and change the name to relevantClaims[0].value
  }

  async ngOnInit() {
    const userClaims = await this.oktaAuth.getUser();
    this.userClaims = userClaims;
    this.claims = Object.entries(userClaims).map(entry => ({ claim: entry[0], value: entry[1] }));


   this.randomGeneratedID = Math.floor(Math.random()*((499000-10000)+1) +10000).toString();

   let c = {
     claim: 'employeeID',
     value: this.randomGeneratedID
   };

   this.relevantClaims.push(this.claims[1]);
   this.relevantClaims.push(this.claims[3]);
   this.relevantClaims.push(c);
  }
}
