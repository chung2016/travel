import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  })

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  formSubmit(): void {
    if (this.loginForm.invalid) {
      return
    }
    const { username, password } = this.loginForm.value
    this.authService.login(username, password).subscribe(
      (data: any) => {
        localStorage.setItem('accessToken', data.accessToken)
        localStorage.setItem('refreshToken', data.refreshToken)
        alert('login success')
        this.router.navigate(['/v2/profile'])
      },
      (error) => {
        alert(error.error.message)
      }
    )
  }
}
