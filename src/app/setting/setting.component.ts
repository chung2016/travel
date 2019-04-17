import { Component, OnInit } from '@angular/core';
import { AlertService, AuthenticationService, UserService } from '../core/services';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
  user: any = {};
  settingForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private userService: UserService,
    private _router: Router,
    private authenticationService: AuthenticationService,
  ) { }

  ngOnInit() {
    this.settingForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.userService.getCurrent().subscribe(user => {
      this.user = user;
    }, err => {
      console.log(err)
    });
  }

  get f() {
    return this.settingForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.settingForm.invalid) {
      return;
    }
    this.loading = true;
    Object.assign(this.user, this.settingForm.value);
    this.userService
      .update(this.user)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Update successful');
          this.loading = false;
        },
        err => {
          this.alertService.error(err);
          this.loading = false;
        }
      );
  }

  deleteUser() {
    if (confirm("Are you sure to delete ")) {
      this.userService.delete(this.user._id).pipe(first()).subscribe(
        data => {
          this.loading = false;
          this.authenticationService.logout();
          this._router.navigate(['/login']);
        },
        err => {
          this.alertService.error(err);
          this.loading = false;
        }
      );

    }
  }

}
