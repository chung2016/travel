import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { User } from '@v1/core/models'
import { AuthenticationService } from '@v1/core/services'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  currentUser: User
  constructor(private _router: Router, private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe((x) => (this.currentUser = x), console.error)
  }

  ngOnInit() {}

  logout() {
    this.authenticationService.logout()
    this._router.navigate(['/v1/auth/login'])
  }
}
