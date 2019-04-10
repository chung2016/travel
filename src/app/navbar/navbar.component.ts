import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../_models';
import { AuthenticationService } from '../_services';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  currentUser: User;
  constructor(private _router: Router, private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() { }

  logout() {
    this.authenticationService.logout();
    this._router.navigate(['/login']);
  }
}
