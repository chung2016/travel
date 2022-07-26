import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Validators, FormControl, FormGroup } from '@angular/forms'
import { finalize, first } from 'rxjs/operators'

import { AlertService, UserService, AuthenticationService } from '@v1/core/services'
import { User } from '@v1/core/models'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm = new FormGroup({
    email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
    username: new FormControl('', Validators.compose([Validators.required])),
    password: new FormControl(
      '',
      Validators.compose([Validators.required, Validators.minLength(6)])
    ),
    gender: new FormControl('Male', Validators.compose([])),
  })
  loading = false
  submitted = false

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private alertService: AlertService
  ) {
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/v1'])
    }
  }

  ngOnInit() {}

  get f() {
    return this.registerForm.controls
  }

  onSubmit() {
    this.submitted = true
    if (this.registerForm.invalid) {
      return
    }

    this.loading = true
    this.userService
      .register(this.registerForm.value as User)
      .pipe(
        first(),
        finalize(() => (this.loading = false))
      )
      .subscribe(
        () => {
          this.alertService.success('Registration successful', true)
          this.router.navigate(['/v1/auth/login'])
        },
        (error) => {
          this.alertService.error(error)
        }
      )
  }
}
