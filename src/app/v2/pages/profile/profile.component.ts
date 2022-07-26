import { Component, OnInit } from '@angular/core'
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.me()
  }

  private me() {
    this.authService.me().subscribe((data) => {
      console.log(data)
    }, console.error)
  }
}
