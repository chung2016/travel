import { Component, OnInit } from '@angular/core';
import { AlertService, AuthenticationService, UserService } from '../core/services';
import { UntypedFormBuilder, Validators, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { UploadService } from '../core/services/upload.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
  user: any = {};
  settingForm: UntypedFormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private alertService: AlertService,
    private userService: UserService,
    private _router: Router,
    private authenticationService: AuthenticationService,
    private uploadService: UploadService
  ) { }

  ngOnInit() {
    this.settingForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      image: [''],
      gender: ['Male']
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

  handleFileInput(files: FileList) {
    this.loading = true;
    this.uploadService.upload(files.item(0)).subscribe(
      data => {
        this.user.image = data.file;
        this.loading = false;
      }, err => {
        this.alertService.error(err);
        this.loading = false;
      }
    )
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
          
          // updataCurr
          this.authenticationService.update();
          // updataCurr

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
