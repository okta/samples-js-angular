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
import { Injector, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { APP_BASE_HREF } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SuiModalService, SuiModalModule } from '@giomamaladze/ng2-semantic-ui';
import { OktaAuth } from '@okta/okta-auth-js';
import {
  OKTA_CONFIG,
  OktaAuthGuard,
  OktaAuthModule,
  OktaCallbackComponent,
} from '@okta/okta-angular';
import { environment } from '../environments/environment';

import config from './app.config';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MessagesComponent } from './messages/messages.component';
import { ProfileComponent } from './profile/profile.component';
import { ConfirmModalComponent, ConfirmModal } from './modal/confirm.component';

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
    ConfirmModalComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    OktaAuthModule,
    RouterModule.forRoot(appRoutes, { relativeLinkResolution: 'legacy' }),
    SuiModalModule,
  ],
  providers: [
    { 
      provide: OKTA_CONFIG, 
      useFactory: () => {
        const oktaAuth = new OktaAuth(config.oidc);
        return {
          oktaAuth,
          onAuthRequired: (oktaAuth: OktaAuth, injector: Injector) => {
            const triggerLogin = async () => {
              await oktaAuth.signInWithRedirect();
            };
            if (!oktaAuth.authStateManager.getPreviousAuthState()?.isAuthenticated) {
              // App initialization stage
              triggerLogin();
            } else {
              // Ask the user to trigger the login process during token autoRenew process
              const modalService = injector.get(SuiModalService);
              modalService
                .open(new ConfirmModal("Do you want to re-authenticate?", "Auth required", "Yes", "No"))
                .onApprove(triggerLogin)
                .onDeny(() => {});
            }
          }  
        }
      }
    },
    { provide: APP_BASE_HREF, useValue: environment.appBaseHref },
  ],
  bootstrap: [AppComponent],
  entryComponents: [ConfirmModalComponent],
})
export class AppModule { }
