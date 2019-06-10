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
import { HttpClient } from '@angular/common/http';

import sampleConfig from '../app.config';

interface Message {
  date: String,
  text: String,
}

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  failed: Boolean;
  messages: Array<Message> [];

  constructor(public oktaAuth: OktaAuthService, private http: HttpClient) {
    this.messages = [];
  }

  async ngOnInit() {
    const accessToken = await this.oktaAuth.getAccessToken();
    this.http.get(sampleConfig.resourceServer.messagesUrl, {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      }
    }).subscribe((data: any) => {
      let index = 1;
      const messages = data.messages.map((message) => {
        const date = new Date(message.date);
        const day = date.toLocaleDateString();
        const time = date.toLocaleTimeString();
        return {
          date: `${day} ${time}`,
          text: message.text,
          index: index++
        };
      });
      [].push.apply(this.messages, messages);
    }, (err) => {
      console.error(err);
      this.failed = true;
    });
  }
}
