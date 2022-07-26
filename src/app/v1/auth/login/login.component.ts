import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { finalize, first } from 'rxjs/operators'

import { AlertService, AuthenticationService } from '@v1/core/services'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', Validators.compose([Validators.required])),
    password: new FormControl('', Validators.compose([Validators.required])),
  })
  loading = false
  submitted = false
  returnUrl: String

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService
  ) {
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/v1'])
    }
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/'
  }

  get f() {
    return this.loginForm.controls
  }

  onSubmit() {
    this.submitted = true

    if (this.loginForm.invalid) {
      return
    }

    this.loading = true
    this.authenticationService
      .login(this.f.email.value, this.f.password.value)
      .pipe(
        first(),
        finalize(() => (this.loading = false))
      )
      .subscribe(
        (data) => {
          this.router.navigate([this.returnUrl])
        },
        (err) => {
          this.alertService.error(err)
        }
      )
  }
}
