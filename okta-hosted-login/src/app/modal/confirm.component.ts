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

import { Component } from '@angular/core';
import { SuiModal, ComponentModalConfig, ModalSize } from "@giomamaladze/ng2-semantic-ui";

interface IConfirmModalContext {
    question: string;
    title?: string;
    cancelButton?: string;
    confirmButton?: string;
}

@Component({
    selector: "modal-confirm",
    template: `
<div class="header" *ngIf="modal.context.title">{{ modal.context.title }}</div>
<div class="content">
    <p>{{ modal.context.question }}</p>
</div>
<div class="actions">
    <button class="ui red button" (click)="modal.deny(undefined)">{{ modal.context.cancelButton || "Cancel" }}</button>
    <button class="ui green button" (click)="modal.approve(undefined)" autofocus>{{ modal.context.confirmButton || "OK" }}</button>
</div>
`
})
export class ConfirmModalComponent {
    constructor(public modal:SuiModal<IConfirmModalContext, void, void>) {
    }
}

export class ConfirmModal extends ComponentModalConfig<IConfirmModalContext, void, void> {
    constructor(question: string, title?: string, confirmButton?: string, cancelButton?: string) {
        super(ConfirmModalComponent, { question, title, confirmButton, cancelButton });
        this.isClosable = false;
        this.transitionDuration = 200;
        this.size = ModalSize.Small;
    }
}
