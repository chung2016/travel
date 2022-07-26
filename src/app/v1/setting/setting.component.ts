import { Component, OnInit } from '@angular/core'
import { AlertService, AuthenticationService, UserService } from '../core/services'
import { Validators, FormGroup, FormControl } from '@angular/forms'
import { Router } from '@angular/router'
import { finalize, first } from 'rxjs/operators'
import { UploadService } from '../core/services/upload.service'
import { User } from '../core/models'

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss'],
})
export class SettingComponent implements OnInit {
  settingForm = new FormGroup({
    id: new FormControl(''),
    _id: new FormControl(''),
    username: new FormControl('', Validators.compose([Validators.required])),
    email: new FormControl('', Validators.compose([Validators.required])),
    password: new FormControl(
      '',
      Validators.compose([Validators.required, Validators.minLength(6)])
    ),
    image: new FormControl(''),
    gender: new FormControl('Male'),
  })
  loading = false
  submitted = false

  constructor(
    private alertService: AlertService,
    private userService: UserService,
    private _router: Router,
    private authenticationService: AuthenticationService,
    private uploadService: UploadService
  ) {}

  ngOnInit() {
    this.userService.getCurrent().subscribe((user: any) => {
      this.settingForm.patchValue(user)
    }, console.error)
  }

  get f() {
    return this.settingForm.controls
  }

  handleFileInput(files: FileList) {
    this.loading = true
    this.uploadService
      .upload(files.item(0))
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(
        (data) => {
          this.f.image.setValue(data.file)
        },
        (err) => {
          this.alertService.error(err)
        }
      )
  }

  onSubmit() {
    this.submitted = true
    if (this.settingForm.invalid) {
      return
    }
    this.loading = true
    this.userService
      .update(this.settingForm.value)
      .pipe(
        first(),
        finalize(() => (this.loading = false))
      )
      .subscribe(
        () => {
          this.authenticationService.update()
          this.alertService.success('Update successful')
        },
        (err) => {
          this.alertService.error(err)
        }
      )
  }

  deleteUser() {
    if (confirm('Are you sure to delete ')) {
      this.userService
        .delete(+this.f._id.value)
        .pipe(
          first(),
          finalize(() => (this.loading = false))
        )
        .subscribe(
          () => {
            this.authenticationService.logout()
            this._router.navigate(['/v1/login'])
          },
          (err) => {
            this.alertService.error(err)
          }
        )
    }
  }
}
