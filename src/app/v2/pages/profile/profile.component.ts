import { Component, OnInit } from '@angular/core'
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: any = {};
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.me()
  }

  private me() {
    this.authService.me().subscribe((data: any) => {
      console.log(data)
      this.user = data.user;
    }, console.error)
  }
}
