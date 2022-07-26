import { Component, OnInit } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
  })

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {}

  formSubmit(): void {
    if (this.registerForm.invalid) {
      return
    }
    this.authService.register(this.registerForm.value).subscribe(
      (data) => {
        console.log(data)
        this.router.navigate(['/v2/login'])
        alert('register success')
      },
      (error) => {
        alert(error.error.message)
      }
    )
  }
}
