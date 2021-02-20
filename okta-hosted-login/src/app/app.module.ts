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

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import {
  OKTA_CONFIG,
  OktaAuthGuard,
  OktaAuthModule,
  OktaCallbackComponent,
} from '@okta/okta-angular';

import config from './app.config';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MessagesComponent } from './messages/messages.component';
import { ProfileComponent } from './profile/profile.component';

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login/callback',
    component: OktaCallbackComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [ OktaAuthGuard ],
  },
  {
    path: 'messages',
    component: MessagesComponent,
    canActivate: [ OktaAuthGuard ],
  },
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    MessagesComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    OktaAuthModule,
    RouterModule.forRoot(appRoutes, { relativeLinkResolution: 'legacy' }),
  ],
  providers: [
    { provide: OKTA_CONFIG, useValue: config.oidc },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
