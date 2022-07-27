import { Component, OnInit } from '@angular/core'
import { AlertService, AuthenticationService, UserService } from '@v1/core/services'
import { Validators, FormGroup, FormControl } from '@angular/forms'
import { Router } from '@angular/router'
import { finalize, first, map } from 'rxjs/operators'
import { UploadService } from '@v1/core/services/upload.service'
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment'

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
    private uploadService: UploadService,
    private http: HttpClient
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
    console.log(files)
    this.loading = true
    this.uploadService
      .upload(files[0])
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

  private blobToFile(theBlob: any, fileName: string): File {
    //A Blob() is almost a File() - it's just missing the two properties below which we will add
    theBlob.lastModifiedDate = new Date()
    theBlob.name = fileName
    return <File>theBlob
  }

  async randomFace() {
    const gender = this.f.gender.value.toLowerCase()
    this.http
      .get(`${environment.apiUri}/random-face`, {
        params: {
          gender,
        },
      })
      .pipe(map((val: any) => val.imageUrl))
      .subscribe(async (data) => {
        this.handleFileInput([
          this.blobToFile(await (await fetch(data)).blob(), 'random-face.jpg'),
        ] as any)
      })
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
            this._router.navigate(['/v1/auth/login'])
          },
          (err) => {
            this.alertService.error(err)
          }
        )
    }
  }
}
