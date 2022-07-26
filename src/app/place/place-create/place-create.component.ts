import { Component, OnInit } from '@angular/core'
import { Validators, FormGroup, FormControl } from '@angular/forms'
import { PlaceService } from 'src/app/core/services/place.service'
import { AlertService, AuthenticationService } from 'src/app/core/services'
import { Place, User } from 'src/app/core/models'
import { Router } from '@angular/router'
import { UploadService } from 'src/app/core/services/upload.service'
import { finalize } from 'rxjs/operators'

@Component({
  selector: 'app-place-create',
  templateUrl: './place-create.component.html',
  styleUrls: ['./place-create.component.scss'],
})
export class PlaceCreateComponent implements OnInit {
  place: Place = {} as Place

  data: any = {}
  createPlaceForm = new FormGroup({
    name: new FormControl('', Validators.compose([Validators.required])),
    location: new FormControl('', Validators.compose([Validators.required])),
    type: new FormControl('Relax'),
    description: new FormControl(''),
    authorComment: new FormControl(''),
  })
  loading = false
  submitted = false
  currentUser: User

  constructor(
    private router: Router,
    private placeService: PlaceService,
    private alertService: AlertService,
    private authenticationService: AuthenticationService,
    private uploadService: UploadService
  ) {}

  ngOnInit() {
    this.authenticationService.currentUser.subscribe((x) => (this.currentUser = x), console.error)
  }

  get f() {
    return this.createPlaceForm.controls
  }

  onSubmit() {
    this.submitted = true

    if (this.createPlaceForm.invalid) {
      return
    }

    this.loading = true
    this.place.author = this.currentUser
    this.updatePlace(this.createPlaceForm.value)
    this.placeService
      .create(this.place)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(
        (data) => {
          this.data = data

          this.alertService.success('Create successful', true)
          this.router.navigate(['/place/' + this.data._id])
        },
        (err) => {
          this.alertService.error(err)
        }
      )
  }

  handleFileInput(files: FileList) {
    this.loading = true
    this.uploadService
      .upload(files.item(0))
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(
        (data) => {
          this.place.photo = data.file
        },
        (err) => {
          this.alertService.error(err)
        }
      )
  }

  updatePlace(values: Object) {
    Object.assign(this.place, values)
  }
}
