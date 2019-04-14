import { Component, OnInit } from '@angular/core';
import { AlertService, AuthenticationService, UserService } from '../_services';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { User } from '../_models';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: any = {};
  profileForm: FormGroup;
  loading = false;
  submitted = false;
  currentUser: User;

  constructor(
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.profileForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', [Validators.minLength(6)]]
    });

    this.userService.getCurrent().subscribe(user => {
      this.user = user;
    });
  }

  get f() {
    return this.profileForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.profileForm.invalid) {
      return;
    }
    this.loading = true;
    Object.assign(this.user, this.profileForm.value);
    this.userService
      .update(this.user)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Update successful');
          this.loading = false;
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        }
      );
  }

}
