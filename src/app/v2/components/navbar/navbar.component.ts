import { Component, OnInit } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { Router } from '@angular/router'
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  loggedIn$ = this.authService.onLoggedIn()

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {}

  logout() {
    this.authService.logout().subscribe()
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('accessToken')
    this.authService.setLoggedIn(false)
    this.router.navigate(['/v2'])
  }
}
