import { Router } from "@angular/router";
import { Component } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor(public oktaAuth: OktaAuthService, private router: Router) {

  }
  ngOnInit() {

  }
  logout() {
    this.oktaAuth.logout();
    this.router.navigate(['/']);
  }
}
