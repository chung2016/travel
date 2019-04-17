import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../core/models';
import { AuthenticationService } from '../../core/services';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  currentUser: User;
  constructor(private _router: Router, private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x, err => console.log(err));
  }

  ngOnInit() { }

  logout() {
    this.authenticationService.logout();
    this._router.navigate(['/login']);
  }
}
