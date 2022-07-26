import { Component, OnInit } from '@angular/core'
import { AuthService } from './services/auth.service'

@Component({
  selector: 'app-v2',
  templateUrl: './v2.component.html',
  styleUrls: ['./v2.component.scss'],
})
export class V2Component implements OnInit {
  constructor(private authService: AuthService) {
    this.authService.setLoggedIn(!!localStorage.getItem('refreshToken'))
    this.authService.onLoggedIn().subscribe((loggedIn) => {
      console.log('onloggedin', loggedIn)
    })
  }

  ngOnInit(): void {}
}
