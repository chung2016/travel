import { Component, OnInit } from '@angular/core'
import { map } from 'rxjs/operators'
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user$
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.user$ = this.authService.me().pipe(map(({ user }: any) => user))
  }
}
